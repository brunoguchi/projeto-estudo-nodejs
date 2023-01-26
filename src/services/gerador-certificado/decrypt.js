#!/usr/bin/env node

const crypto = require("crypto");
const fs = require("fs");

// -------- CONFIG (must match encrypt) --------
const keyLen = 32;
const tagLen = 16;
// -------------------------------------------

const args = process.argv.slice(2);

function getArg(name) {
  const index = args.indexOf(name);
  if (index !== -1 && index + 1 < args.length) {
    return args[index + 1];
  }
  return null;
}

const payload = getArg("--payload");
const passphrase = getArg("--passphrase");
const outFile = getArg("--out");

if (!payload || !passphrase) {
  console.error("Usage: --payload <payload> --passphrase <pass>");
  process.exit(1);
}

// -------- PARSE PAYLOAD ----------
const parts = payload.split(":");

if (parts.length !== 6) {
  console.error("Invalid payload format.");
  process.exit(1);
}

const [version, kdfName, iterStr, saltB64, ivB64, ctB64] = parts;

if (version !== "v1") {
  console.error("Unsupported version:", version);
  process.exit(1);
}

if (kdfName !== "pbkdf2-sha256") {
  console.error("Unsupported KDF:", kdfName);
  process.exit(1);
}

const iterations = parseInt(iterStr, 10);
if (!iterations || iterations <= 0) {
  console.error("Invalid iteration count.");
  process.exit(1);
}

const salt = Buffer.from(saltB64, "base64");
const iv = Buffer.from(ivB64, "base64");
const cipherPlusTag = Buffer.from(ctB64, "base64");

if (cipherPlusTag.length < tagLen) {
  console.error("Ciphertext too short.");
  process.exit(1);
}

// split ciphertext || tag
const ciphertext = cipherPlusTag.slice(0, -tagLen);
const tag = cipherPlusTag.slice(-tagLen);

// -------- DERIVE KEY ----------
const key = crypto.pbkdf2Sync(
  passphrase,
  salt,
  iterations,
  keyLen,
  "sha256"
);

// -------- DECRYPT ----------
try {
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);

  const plaintext = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final()
  ]);

  const pem = plaintext.toString("utf8");

  if (outFile) {
    fs.writeFileSync(outFile, pem, { encoding: "utf8" });
    console.log("Decrypted PEM written to:", outFile);
  } else {
    console.log(pem);
  }
} catch (err) {
  console.error("Failed to decrypt. Wrong passphrase or corrupted payload.");
  process.exit(1);
}
#!/usr/bin/env node

const crypto = require("crypto");
const fs = require("fs");

// -------- CONFIG (must match PowerShell) --------
const iterations = 600000;
const saltLen = 16;
const ivLen = 12;
const keyLen = 32; // AES-256
const tagLen = 16;
// -----------------------------------------------

// --------- CLI ARG PARSE ----------
const args = process.argv.slice(2);

function getArg(name) {
  const index = args.indexOf(name);
  if (index !== -1 && index + 1 < args.length) {
    return args[index + 1];
  }
  return null;
}

const passphrase = getArg("--passphrase");
const pemText = getArg("--pemText");
const pemPath = getArg("--pemPath");

if (!passphrase) {
  console.error("Missing --passphrase");
  process.exit(1);
}

// exactly one PEM source
let sourceCount = 0;
if (pemText) sourceCount++;
if (pemPath) sourceCount++;

if (sourceCount !== 1) {
  console.error("Provide exactly one PEM source: --pemText OR --pemPath");
  process.exit(1);
}

// --------- READ PEM CONTENT ----------
let pem;

if (pemPath) {
  pem = fs.readFileSync(pemPath, "utf8");
} else {
  pem = pemText;
}

if (!pem || pem.trim().length === 0) {
  console.error("PEM content is empty.");
  process.exit(1);
}

// --------- DERIVE KEY ----------
const salt = crypto.randomBytes(saltLen);
const iv = crypto.randomBytes(ivLen);

const key = crypto.pbkdf2Sync(
  passphrase,
  salt,
  iterations,
  keyLen,
  "sha256"
);

// --------- ENCRYPT (AES-GCM) ----------
const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

const ciphertext = Buffer.concat([
  cipher.update(pem, "utf8"),
  cipher.final()
]);

const tag = cipher.getAuthTag();

// ciphertext || tag
const cipherPlusTag = Buffer.concat([ciphertext, tag]);

// --------- FORMAT OUTPUT ----------
const payload = [
  "v1",
  "pbkdf2-sha256",
  iterations,
  salt.toString("base64"),
  iv.toString("base64"),
  cipherPlusTag.toString("base64")
].join(":");

console.log(payload);
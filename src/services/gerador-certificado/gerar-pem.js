const fs = require('fs');

const rawPem = `-----BEGIN RSA PRIVATE KEY-----xxxx-----END RSA PRIVATE KEY-----`;

const header = rawPem.match(/-----BEGIN [^-]+-----/)[0];
const footer = rawPem.match(/-----END [^-]+-----/)[0];

const base64 = rawPem
  .replace(header, '')
  .replace(footer, '')
  .replace(/\r?\n|\r/g, '')
  .trim();

const formatted = base64.match(/.{1,64}/g).join('\n');

const finalPem = `${header}\n${formatted}\n${footer}`;

fs.writeFileSync('private_key.pem', finalPem);

console.log('PEM gerado com sucesso!');
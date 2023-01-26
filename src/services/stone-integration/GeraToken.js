const { privateDecrypt } = require("crypto");

//Chave privada RSA
const PRIVATE_KEY = "xxx";

// Token criptografado (challenge) em formato hexadecimal
const challenge = process.argv[2] || "xxx";

//Criar o objeto de descriptografia e Descriptografar o challenge
const result = privateDecrypt(
  PRIVATE_KEY,
  Buffer.from(challenge, "hex")
).toString();

//Imprimira Secret Key
console.log(result);

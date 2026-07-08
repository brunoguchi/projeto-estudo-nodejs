# Encriptar
node encrypt-token.js --passphrase "minha-senha" --token "meu-token-secreto"

# Decriptar
node decrypt-token.js --passphrase "minha-senha" --payload "v1:pbkdf2-sha256:600000:..."

# Script python
python encrypt_tokens_csv.py --passphrase "palavra-chave-aqui"
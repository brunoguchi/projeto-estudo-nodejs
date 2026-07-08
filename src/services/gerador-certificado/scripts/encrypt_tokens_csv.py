#!/usr/bin/env python3
"""
Script para ler um arquivo CSV de estabelecimentos e gerar tokens criptografados.

Uso:
    python encrypt_tokens_csv.py --passphrase "minha-senha" [--input arquivo.csv] [--output arquivo_output.csv]

Parâmetros:
    --passphrase  : Senha para criptografar os tokens (obrigatório)
    --input       : Arquivo CSV de entrada (padrão: de-para-estabelecimentos.csv)
    --output      : Arquivo CSV de saída (padrão: de-para-estabelecimentos-encrypted.csv)
"""

import argparse
import csv
import subprocess
import sys
import os
from pathlib import Path


def get_script_dir():
    """Retorna o diretório onde este script está localizado."""
    return Path(__file__).parent.resolve()


def encrypt_token(passphrase: str, token: str, encrypt_script_path: Path) -> str:
    """
    Chama o script Node.js encrypt-token.js para criptografar um token.
    
    Args:
        passphrase: Senha para criptografia
        token: Token a ser criptografado
        encrypt_script_path: Caminho para o script encrypt-token.js
    
    Returns:
        Token criptografado
    
    Raises:
        RuntimeError: Se o script Node.js falhar
    """
    try:
        result = subprocess.run(
            [
                "node",
                str(encrypt_script_path),
                "--passphrase", passphrase,
                "--token", token
            ],
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"Erro ao criptografar token: {e.stderr}")


def process_csv(input_file: Path, output_file: Path, passphrase: str, encrypt_script_path: Path):
    """
    Processa o arquivo CSV, criptografa os tokens e gera um novo arquivo.
    
    Args:
        input_file: Caminho do arquivo CSV de entrada
        output_file: Caminho do arquivo CSV de saída
        passphrase: Senha para criptografia
        encrypt_script_path: Caminho para o script encrypt-token.js
    """
    if not input_file.exists():
        print(f"Erro: Arquivo de entrada não encontrado: {input_file}")
        sys.exit(1)
    
    if not encrypt_script_path.exists():
        print(f"Erro: Script de criptografia não encontrado: {encrypt_script_path}")
        sys.exit(1)
    
    rows_processed = 0
    rows_with_errors = 0
    
    with open(input_file, 'r', encoding='utf-8') as infile:
        reader = csv.DictReader(infile, delimiter=';')
        
        # Verifica se a coluna Token existe
        if 'Token' not in reader.fieldnames:
            print("Erro: Coluna 'Token' não encontrada no arquivo CSV")
            sys.exit(1)
        
        # Define os campos de saída (adiciona TokenCriptografado)
        output_fieldnames = list(reader.fieldnames) + ['TokenCriptografado']
        
        with open(output_file, 'w', encoding='utf-8', newline='') as outfile:
            writer = csv.DictWriter(outfile, fieldnames=output_fieldnames, delimiter=';')
            writer.writeheader()
            
            for row in reader:
                token = row.get('Token', '').strip()
                
                if token:
                    try:
                        encrypted_token = encrypt_token(passphrase, token, encrypt_script_path)
                        row['TokenCriptografado'] = encrypted_token
                        print(f"[OK] Estabelecimento {row.get('Estabelecimento', 'N/A')}: Token criptografado com sucesso")
                    except RuntimeError as e:
                        row['TokenCriptografado'] = f"ERRO: {e}"
                        rows_with_errors += 1
                        print(f"[ERRO] Estabelecimento {row.get('Estabelecimento', 'N/A')}: {e}")
                else:
                    row['TokenCriptografado'] = ''
                    print(f"[AVISO] Estabelecimento {row.get('Estabelecimento', 'N/A')}: Token vazio")
                
                writer.writerow(row)
                rows_processed += 1
    
    print(f"\n{'='*60}")
    print(f"Processamento concluído!")
    print(f"Total de linhas processadas: {rows_processed}")
    print(f"Linhas com erro: {rows_with_errors}")
    print(f"Arquivo de saída gerado: {output_file}")


def main():
    parser = argparse.ArgumentParser(
        description='Criptografa tokens de um arquivo CSV usando encrypt-token.js'
    )
    parser.add_argument(
        '--passphrase',
        required=True,
        help='Senha para criptografar os tokens'
    )
    parser.add_argument(
        '--input',
        default='de-para-estabelecimentos.csv',
        help='Arquivo CSV de entrada (padrão: de-para-estabelecimentos.csv)'
    )
    parser.add_argument(
        '--output',
        default=None,
        help='Arquivo CSV de saída (padrão: <input>-encrypted.csv)'
    )
    
    args = parser.parse_args()
    
    script_dir = get_script_dir()
    parent_dir = script_dir.parent  # gerador-certificado
    
    # Define caminhos
    encrypt_script_path = parent_dir / 'encrypt-token.js'
    
    # Se o input é um caminho relativo, usa o diretório scripts como base
    input_path = Path(args.input)
    if not input_path.is_absolute():
        input_path = script_dir / args.input
    
    # Define o arquivo de saída
    if args.output:
        output_path = Path(args.output)
        if not output_path.is_absolute():
            output_path = script_dir / args.output
    else:
        # Gera nome baseado no input
        output_name = input_path.stem + '-encrypted' + input_path.suffix
        output_path = input_path.parent / output_name
    
    print(f"{'='*60}")
    print(f"Criptografador de Tokens CSV")
    print(f"{'='*60}")
    print(f"Arquivo de entrada: {input_path}")
    print(f"Arquivo de saída: {output_path}")
    print(f"Script de criptografia: {encrypt_script_path}")
    print(f"{'='*60}\n")
    
    process_csv(input_path, output_path, args.passphrase, encrypt_script_path)


if __name__ == '__main__':
    main()

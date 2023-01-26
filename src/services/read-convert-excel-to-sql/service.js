const fs = require('fs');
const xlsx = require('xlsx');
const path = require('path');

function formatarNumero(valor) {
  let numero;

  if (typeof valor === 'number') {
    numero = valor;
  } else if (typeof valor === 'string') {
    numero = parseFloat(valor.replace('.', '').replace(',', '.'));
  } else {
    return '0.00';
  }

  return Number(numero);
}

function formatarData(valor) {
  const [dia, mes, anoHora] = valor.split('.');
  const [ano, hora] = anoHora.split(' ');
  return `${dia}-${mes}-${ano} ${hora}`;
}

function normalizarChaves(obj) {
  const novo = {};
  for (let chave in obj) {
    const chaveLimpa = chave.trim().toUpperCase().replace(/\s+/g, '_');
    novo[chaveLimpa] = obj[chave];
  }
  return novo;
}

// function gerarInsert(linha) {
//    const insert = `INSERT INTO OPERADOR_REVOLUCIONARIO (AGENTE, OPERADOR, META, NIVEL, SPRINT, DATA_INICIO, DATA_FIM) VALUES (
//     ${linha['CÓDIGO_AGENTE']},
//     ${linha['CODIGO_OPERADOR']},
//     ${formatarNumero(linha['META'])},
//     '${linha['NÝVEL']}',
//     ${linha['SPRINT']},
//     TO_DATE('${formatarData(linha['DATA_INICIO'])}', 'DD-MM-YYYY HH24:MI:SS'),
//     TO_DATE('${formatarData(linha['DATA_FIM'])}', 'DD-MM-YYYY HH24:MI:SS')
//   );`;

//   return insert.replace(/\s*\n\s*/g, ' ');
// }

// function gerarInsert(linha) {
//    const insert = `INSERT INTO PLD_ZN_EXTRACAO_MINERAL (CD_LV,CD_LISTADO,CD_TP_LISTA,DE_LISTADO,FL_ALTERAVEL,DT_DESATIVACAO,DE_COMPLEMENTO,CEP,EXTRACAO,RAIZ_CNPJ,DE_LISTADO_SEM_ESPACO) VALUES (
//     '${(linha['CD_LV'] || '').trim()}',
//     '${(linha['CD_LISTADO'] || '').trim()}',
//     '${(linha['CD_TP_LISTA'] || '').trim()}',
//     '${(linha['DE_LISTADO'] || '').trim()}',
//     '${(linha['FL_ALTERAVEL'] || '').trim()}',
//     '${(linha['DT_DESATIVACAO'] || '').trim()}',
//     '${(linha['DE_COMPLEMENTO'] || '').trim()}',
//     '${(linha['CEP'] || '').trim()}',
//     '${(linha['EXTRACAO'] || '').trim()}',
//     '${(linha['RAIZ_CNPJ'] || '').trim()}',
//     '${(linha['DE_LISTADO_SEM_ESPACO'] || '').trim()}'
//   );`;

//   return insert.replace(/\s*\n\s*/g, ' ');
// }

// function gerarInsert(linha) {
//    const insert = `INSERT INTO SUA_TABELA_AQUI (CD_LV,EXTRACAO) VALUES (
//     '${(linha['CD_LV'] || '').trim()}',
//     '${(linha['EXTRACAO'] || '').trim()}'
//   );`;

//   return insert.replace(/\s*\n\s*/g, ' ');
// }

// function gerarInsert(linha) {
//    const insert = `INSERT INTO PLD_PAISES_GAFI (CD_PAIS,SIGLA_PAIS,NOME_PAIS,NOME_PAIS_INGLES,RISCO_PAIS,OFAC,PARAISO_FISCAL,FL_NONFATF,ONU,SANCIONADO_OFAC,FINANCEIRA_OFAC,ECONOMICA_OFAC,SANCIONADO_EU,FINANCEIRA_EU,ECONOMICA_EU,GAFI_IN_PROCESS,GAFI_HIGH_RISK,SANCAO_INTERNA,SANCAO_ARMAMENTO) VALUES (
//     ${String(linha['CD_PAIS'] || '').trim()},
//     '${(linha['SIGLA_PAIS'] || '').trim()}',
//     '${(linha['NOME_PAIS'] || '').trim()}',
//     '${(linha['NOME_PAIS_INGLES'] || '').trim()}',
//     '${(linha['RISCO_PAIS'] || '').trim()}',
//     '${(linha['OFAC'] || '').trim()}',
//     '${(linha['PARAISO_FISCAL'] || '').trim()}',
//     '${(linha['FL_NONFATF'] || '').trim()}',
//     '${(linha['ONU'] || '').trim()}',
//     '${(linha['SANCIONADO_OFAC'] || '').trim()}',
//     '${(linha['FINANCEIRA_OFAC'] || '').trim()}',
//     '${(linha['ECONOMICA_OFAC'] || '').trim()}',
//     '${(linha['SANCIONADO_EU'] || '').trim()}',
//     '${(linha['FINANCEIRA_EU'] || '').trim()}',
//     '${(linha['ECONOMICA_EU'] || '').trim()}',
//     '${(linha['GAFI_IN_PROCESS'] || '').trim()}',
//     '${(linha['GAFI_HIGH_RISK'] || '').trim()}',
//     '${(linha['SANCAO_INTERNA'] || '').trim()}',
//     '${(linha['SANCAO_ARMAMENTO'] || '').trim()}'
//   );`;

//   return insert.replace(/\s*\n\s*/g, ' ');
// }

function gerarInsert(linha) {
   const insert = `INSERT INTO CNAE_RISCO_PLD (LISTA, CODIGO, NOME) VALUES (
    'CNAEs de Risco',
    '${String(linha['CNAE'] || '').trim().replace(/\//g, '').replace(/-/g, '')}',
    '${String(linha['ATIVIDADE'] || '').trim()}'
  );`;

  return insert.replace(/\s*\n\s*/g, ' ');
}


const arquivoExcel = path.resolve(__dirname, 'atividades_sensiveis_cnae_atualizado_formatado.xlsx');
const workbook = xlsx.readFile(arquivoExcel);
const abas = ['Sheet1'];

let inserts = [];

abas.forEach((aba) => {
  const planilha = workbook.Sheets[aba];
  const dados = xlsx.utils.sheet_to_json(planilha, { defval: '' });

  dados.forEach((linha, index) => {
    try {
      const linhaNormalizada = normalizarChaves(linha);
      const insert = gerarInsert(linhaNormalizada);
      inserts.push(insert);
    } catch (err) {
      console.error(`Erro ao processar linha ${index + 1} da aba "${aba}":`, err);
    }
  });
});

const arquivoSaida = path.resolve(__dirname, 'inserts_oracle.txt');
fs.writeFileSync(arquivoSaida, inserts.join('\n\n'), 'utf8');

console.log(`Arquivo "${arquivoSaida}" gerado com sucesso com ${inserts.length} INSERTs.`);
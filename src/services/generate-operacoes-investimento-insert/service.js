const fs = require('fs');
const path = require('path');

function pad(num, size) {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
}

function randomDate(start, end) {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().replace('T', ' ').substring(0, 23);
}

function randomFloat(min, max, decimals = 2) {
    return (Math.random() * (max - min) + min).toFixed(decimals);
}

function generateInsertRow() {
    const DT_LIQUIDACAO_EFETIVA = randomDate(new Date('2025-01-01'), new Date('2025-12-31'));
    const CD_EMPRESA = pad(Math.floor(Math.random() * 99) + 1, 2);
    // Gera um número inteiro grande como string, sem notação científica
    let CD_IDENTIFICACAO = '';
    while (CD_IDENTIFICACAO.length < 32) {
        CD_IDENTIFICACAO += Math.floor(Math.random() * 10).toString();
    }
    CD_IDENTIFICACAO = CD_IDENTIFICACAO.substring(0, 32);
    const CD_CLIENTE = pad(Math.floor(Math.random() * 99999999999999), 14);
    const NR_TITULO = pad(Math.floor(Math.random() * 9999999), 7);
    const TP_OPERACAO = Math.random() > 0.5 ? 'R' : 'C';
    const CD_MERCADO = '[NULL]';
    const CD_PAPEL = 'CDB Pré com deságio';
    const DT_EMISSAO = randomDate(new Date('2024-01-01'), new Date('2024-12-31'));
    const DT_OPERACAO = randomDate(new Date('2025-01-01'), new Date('2025-12-31'));
    const VL_OPERACAO = randomFloat(1000, 100000);
    const QT_OPERACAO = 0;
    const VL_PRECO_UNIT = 0;
    const VL_IRF = 0;
    const VL_IOF = 0;
    const VL_LIQUIDO = VL_OPERACAO;
    const VL_RENTABILIDADE = randomFloat(100, 10000);
    const DT_PREV_LIQUIDACAO = DT_LIQUIDACAO_EFETIVA;

    // Função para formatar datas para Oracle
    function toDate(dateStr) {
        return `TO_DATE('${dateStr.substring(0, 19)}', 'YYYY-MM-DD HH24:MI:SS')`;
    }

    return `INSERT INTO LYDIANS_VIEW_OPERAC_INVESTIMENTOS_AUX (
        DT_LIQUIDACAO_EFETIVA, CD_EMPRESA, CD_IDENTIFICACAO, CD_CLIENTE, NR_TITULO, TP_OPERACAO, CD_MERCADO, CD_PAPEL, DT_EMISSAO, DT_OPERACAO, VL_OPERACAO, QT_OPERACAO, VL_PRECO_UNIT, VL_IRF, VL_IOF, VL_LIQUIDO, VL_RENTABILIDADE, DT_PREV_LIQUIDACAO
    ) VALUES (
        ${toDate(DT_LIQUIDACAO_EFETIVA)}, '${CD_EMPRESA}', '${CD_IDENTIFICACAO}', '${CD_CLIENTE}', '${NR_TITULO}', '${TP_OPERACAO}', ${CD_MERCADO === '[NULL]' ? 'NULL' : `'${CD_MERCADO}'`}, '${CD_PAPEL}', ${toDate(DT_EMISSAO)}, ${toDate(DT_OPERACAO)}, ${VL_OPERACAO}, ${QT_OPERACAO}, ${VL_PRECO_UNIT}, ${VL_IRF}, ${VL_IOF}, ${VL_LIQUIDO}, ${VL_RENTABILIDADE}, ${toDate(DT_PREV_LIQUIDACAO)}
    );`;
}

function generateInserts(qtd, outputFile = 'inserts.txt') {
    const rows = [];
    for (let i = 0; i < qtd; i++) {
        rows.push(generateInsertRow());
    }
    const filePath = path.join(__dirname, outputFile);
    fs.writeFileSync(filePath, rows.join('\n'), 'utf8');
    console.log(`Arquivo gerado: ${filePath}`);
}

module.exports = { generateInserts };

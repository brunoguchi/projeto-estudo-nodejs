const sql = require('mssql');
const { v4: uuidv4 } = require('uuid');

const config = {
    user: 'sa',
    password: 'Opensource1*',
    server: 'localhost',
    database: 'pedrada',
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
};

const QTD_REGISTROS = 1000; // Quantidade de transações a gerar
const BATCH_SIZE = 1000;

// Arrays de IDs para geração aleatória
const CLIENTES_IDS = [200001];
const ADQUIRENTES_IDS = [
    '855505B3-1B10-4451-BF5A-7B23C7FB3DD3', //PagSeguro
    'F6AE2939-76BD-4D7E-82E1-22F32833341F' //Stone
];

const PLANO_ID = 'E2FD4C89-263C-4E5C-8D3C-A9A93451C627';
const USUARIO_ATUALIZACAO = 'usuario-automacao';
const DATA_INICIAL = new Date('2025-01-01T00:00:00Z');

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function randomFloat(min, max, decimals = 2) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}
function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function adicionaHoras(data, horas) {
    return new Date(data.getTime() + horas * 60 * 60 * 1000);
}
function adicionaDias(data, dias) {
    return new Date(data.getTime() + dias * 24 * 60 * 60 * 1000);
}
function formatDate(date) {
    return date.toISOString().replace('T', ' ').slice(0, 19);
}

function buildTransacaoTable(rows) {
    const table = new sql.Table('Transacao');
    table.create = false;
    table.columns.add('Id', sql.UniqueIdentifier, { nullable: false });
    table.columns.add('ClienteId', sql.BigInt, { nullable: false });
    table.columns.add('AdquirenteId', sql.UniqueIdentifier, { nullable: false });
    table.columns.add('PlanoId', sql.UniqueIdentifier, { nullable: false });
    table.columns.add('DataCaptura', sql.DateTime2, { nullable: false });
    table.columns.add('DataAutorizacao', sql.DateTime2, { nullable: false });
    table.columns.add('FormaPagamento', sql.Int, { nullable: false });
    table.columns.add('QuantidadeTotalParcelas', sql.Int, { nullable: false });
    table.columns.add('ValorTotal', sql.Decimal(18, 2), { nullable: false });
    table.columns.add('ValorTotalCancelado', sql.Decimal(18, 2), { nullable: false });
    table.columns.add('TaxaMdr', sql.Decimal(18, 2), { nullable: false });
    table.columns.add('BandeiraCartao', sql.Int, { nullable: false });
    table.columns.add('StatusTransacao', sql.Int, { nullable: false });
    table.columns.add('ModoPagamentoCartao', sql.Int, { nullable: false });
    table.columns.add('IdentificadorUnico', sql.NVarChar(300), { nullable: false });
    table.columns.add('NumeroCartao', sql.NVarChar(300), { nullable: false });
    table.columns.add('DataUltimaAtualizacao', sql.DateTime2, { nullable: false });
    table.columns.add('UsuarioUltimaAtualizacao', sql.NVarChar(300), { nullable: false });
    table.columns.add('DataCriacao', sql.DateTime2, { nullable: false });

    rows.forEach((r) => {
        table.rows.add(
            r.Id, r.ClienteId, r.AdquirenteId, r.PlanoId, r.DataCaptura, r.DataAutorizacao,
            r.FormaPagamento, r.QuantidadeTotalParcelas, r.ValorTotal, r.ValorTotalCancelado,
            r.TaxaMdr, r.BandeiraCartao, r.StatusTransacao, r.ModoPagamentoCartao, r.IdentificadorUnico,
            r.NumeroCartao, r.DataUltimaAtualizacao, r.UsuarioUltimaAtualizacao, r.DataCriacao
        );
    });
    return table;
}

function buildParcelaTable(rows) {
    const table = new sql.Table('TransacaoParcela');
    table.create = false;
    table.columns.add('Id', sql.UniqueIdentifier, { nullable: false });
    table.columns.add('TransacaoId', sql.UniqueIdentifier, { nullable: false });
    table.columns.add('ClienteId', sql.BigInt, { nullable: false });
    table.columns.add('NumeroParcela', sql.Int, { nullable: false });
    table.columns.add('ValorBruto', sql.Decimal(18, 2), { nullable: false });
    table.columns.add('ValorLiquido', sql.Decimal(18, 2), { nullable: false });
    table.columns.add('DataVencimento', sql.DateTime2, { nullable: false });
    table.columns.add('Status', sql.Int, { nullable: false });
    table.columns.add('DataPagamento', sql.DateTime2, { nullable: false });
    table.columns.add('TaxaAntecipacao', sql.Decimal(18, 2), { nullable: false });
    table.columns.add('ValorLiquidoAntecipacao', sql.Decimal(18, 2), { nullable: false });
    table.columns.add('TaxaMdr', sql.Decimal(18, 2), { nullable: false });
    table.columns.add('PercentualSplit', sql.Decimal(18, 2), { nullable: false });
    table.columns.add('ValorSplit', sql.Decimal(18, 2), { nullable: false });
    table.columns.add('DataUltimaAtualizacao', sql.DateTime2, { nullable: false });
    table.columns.add('UsuarioUltimaAtualizacao', sql.NVarChar(300), { nullable: false });
    table.columns.add('DataCriacao', sql.DateTime2, { nullable: false });

    rows.forEach((r) => {
        table.rows.add(
            r.Id, r.TransacaoId, r.ClienteId, r.NumeroParcela, r.ValorBruto, r.ValorLiquido,
            r.DataVencimento, r.Status, r.DataPagamento, r.TaxaAntecipacao, r.ValorLiquidoAntecipacao,
            r.TaxaMdr, r.PercentualSplit, r.ValorSplit, r.DataUltimaAtualizacao, r.UsuarioUltimaAtualizacao, r.DataCriacao
        );
    });
    return table;
}

async function gerarMassa() {
    const pool = await sql.connect(config);
    let dataBase = new Date(DATA_INICIAL);
    let inseridos = 0;
    try {
        for (let i = 0; i < QTD_REGISTROS; i += BATCH_SIZE) {
            const transacoes = [];
            const parcelas = [];
            for (let j = 0; j < BATCH_SIZE && (i + j) < QTD_REGISTROS; j++) {
                const transacaoId = uuidv4();

                const DataCaptura = adicionaHoras(dataBase, i + j);
                const DataAutorizacao = adicionaHoras(DataCaptura, randomInt(0, 5));
                const DataUltimaAtualizacao = adicionaHoras(DataAutorizacao, randomInt(0, 10));

                const valorTotal = randomFloat(100, 1000);
                const taxaMdr = randomFloat(1, 5);
                const percentualSplit = randomFloat(1, 100);
                const statusTransacao = randomInt(1, 4);
                const bandeiraCartao = randomInt(1, 3);
                const modoPagamento = randomInt(1, 3);
                const formaPagamento = randomInt(1, 4);
                const identificadorUnico = uuidv4();
                const numeroCartao = '**** **** **** ' + randomInt(1000, 9999);

                // Número de parcelas aleatório entre 1 e 12
                const quantidadeParcelas = randomInt(1, 13);

                // Seleciona cliente e adquirente aleatórios
                const clienteId = randomFromArray(CLIENTES_IDS);
                const adquirenteId = randomFromArray(ADQUIRENTES_IDS);

                transacoes.push({
                    Id: transacaoId,
                    ClienteId: clienteId,
                    AdquirenteId: adquirenteId,
                    PlanoId: PLANO_ID,
                    DataCaptura,
                    DataAutorizacao,
                    FormaPagamento: formaPagamento,
                    QuantidadeTotalParcelas: quantidadeParcelas,
                    ValorTotal: valorTotal,
                    ValorTotalCancelado: 0,
                    TaxaMdr: taxaMdr,
                    BandeiraCartao: bandeiraCartao,
                    StatusTransacao: statusTransacao,
                    ModoPagamentoCartao: modoPagamento,
                    IdentificadorUnico: identificadorUnico,
                    NumeroCartao: numeroCartao,
                    DataUltimaAtualizacao: DataUltimaAtualizacao,
                    UsuarioUltimaAtualizacao: USUARIO_ATUALIZACAO,
                    DataCriacao: DataCaptura
                });

                // Gerar as parcelas dinamicamente
                const valorPorParcela = valorTotal / quantidadeParcelas;
                let somaValoresParcelas = 0;

                for (let p = 1; p <= quantidadeParcelas; p++) {
                    const parcelaId = uuidv4();

                    // Para a última parcela, ajusta o valor para garantir que a soma seja exata
                    const isUltimaParcela = (p === quantidadeParcelas);
                    const valorBrutoParcela = isUltimaParcela
                        ? parseFloat((valorTotal - somaValoresParcelas).toFixed(2))
                        : parseFloat(valorPorParcela.toFixed(2));

                    somaValoresParcelas += valorBrutoParcela;

                    // Vencimento: 30 dias para a primeira parcela, depois +30 dias para cada parcela
                    const diasVencimento = 30 * p;
                    const DataVencimento = adicionaDias(DataCaptura, diasVencimento);
                    const DataPagamento = adicionaDias(DataVencimento, randomInt(0, 10));

                    const valorLiquido = valorBrutoParcela - randomFloat(0.5, 3);
                    const valorLiquidoAntecipacao = valorLiquido - randomFloat(0, 2);

                    parcelas.push({
                        Id: parcelaId,
                        TransacaoId: transacaoId,
                        ClienteId: clienteId,
                        NumeroParcela: p,
                        ValorBruto: valorBrutoParcela,
                        ValorLiquido: parseFloat(valorLiquido.toFixed(2)),
                        DataVencimento,
                        Status: statusTransacao,
                        DataPagamento,
                        TaxaAntecipacao: taxaMdr,
                        ValorLiquidoAntecipacao: parseFloat(valorLiquidoAntecipacao.toFixed(2)),
                        TaxaMdr: taxaMdr,
                        PercentualSplit: percentualSplit,
                        ValorSplit: parseFloat(valorLiquido.toFixed(2)),
                        DataUltimaAtualizacao,
                        UsuarioUltimaAtualizacao: USUARIO_ATUALIZACAO,
                        DataCriacao: DataCaptura
                    });
                }
            }

            await pool.request().bulk(buildTransacaoTable(transacoes));
            await pool.request().bulk(buildParcelaTable(parcelas));
            inseridos += transacoes.length;

            if (inseridos % 10000 == 0 || inseridos === QTD_REGISTROS) {
                console.log(`Inseridos ${inseridos} registros.`);
            }
        }
        console.log('Massa de dados criada com sucesso!');
        sql.close();
    } catch (err) {
        console.error('Erro ao gerar massa:', err);
        sql.close();
    }
}

gerarMassa();
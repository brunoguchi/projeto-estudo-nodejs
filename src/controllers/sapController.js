const getConsultaCredito =
    (request, response) => {
        // Parsear a nova URL: /v1/vloz/credito/01/consulta?$filter=cliente eq '1006085' and data_lancamento ge 2025-02-04 and data_lancamento le 2025-02-04

        const url = request.url;

        // Extrair o query string e decodificar
        const queryString = url.split('?')[1];
        if (!queryString) {
            return response.status(400).json({ error: 'Query string não encontrada' });
        }

        // Decodificar a query string (URL-encoded)
        const decodedQuery = decodeURIComponent(queryString);

        // Extrair parâmetros do $filter usando regex
        const clienteMatch = decodedQuery.match(/cliente\s+eq\s+'([^']+)'/);
        const dataGeMatch = decodedQuery.match(/data_lancamento\s+ge\s+([^\s&]+)/);
        const dataLeMatch = decodedQuery.match(/data_lancamento\s+le\s+([^\s&]+)/);

        if (!clienteMatch) {
            return response.status(400).json({ error: 'Formato de URL inválido - cliente não encontrado' });
        }

        const cliente = clienteMatch[1];
        const dataInicio = dataGeMatch ? dataGeMatch[1] : null;
        const dataFim = dataLeMatch ? dataLeMatch[1] : null;

        //console.log(`Consulta Crédito - Cliente: ${cliente}, Data Início: ${dataInicio}, Data Fim: ${dataFim}`);

        const now = new Date();
        const timestamp = now.getFullYear().toString() +
            (now.getMonth() + 1).toString().padStart(2, '0') +
            now.getDate().toString().padStart(2, '0') +
            now.getHours().toString().padStart(2, '0') +
            now.getMinutes().toString().padStart(2, '0') +
            now.getSeconds().toString().padStart(2, '0');

        const jsonResponse = {
            "@odata.context": `../$metadata#consulta`,
            "@odata.metadataEtag": `W/"datetime'${timestamp}'"`,
            "value": [
                {
                    "empresa": "4014",
                    "doc_contab": "2000869769",
                    "exercicio": "2026",
                    "item": "1",
                    "origem": "",
                    "adquirente": "",
                    "cliente": "1006408",
                    "cnpj_cliente": "82525171000107",
                    "cod_raz_especial": "",
                    "num_atribuicao": "9062753536",
                    "data_lancamento": "2026-04-30",
                    "data_doc": "2026-05-28",
                    "codigo_moeda": "BRL",
                    "num_doc_ref": "002842886-6",
                    "tipo_doc": "RV",
                    "credito_debito": "S",
                    "divisao": "4002",
                    "valor": 79.84,
                    "contab_geral": "11201010",
                    "dta_calc_venc": "2026-04-30",
                    "forma_pag_financ": "F",
                    "doc_faturamento": "9062753536",
                    "doc_vendas": "2051340854",
                    "area_credito": "4000",
                    "text": "Doc. Faturamento MATERCIC M Como ref.",
                    "codigo_razao": "",
                    "doc_compensacao": "2100024124",
                    "data_compensacao": "2026-04-30",
                    "forma_pag_fatura": "Boleto a Prazo + VLoz",
                    "valor_pedido_nf": 111.72,
                    "valor_pedido_ov": 111.72,
                    "total_nf_c_desconto": 111.72,
                    "saldo_vloz_usado": 10.25,
                    "valor_boletos": 79.84,
                    "codigo_pagador": "1006408",
                    "cnpj_pagador": "82525171000107",
                    "codigo_emissor": "1006408",
                    "cnpj_emissor": "82525171000107"
                },
                {
                    "empresa": "4014",
                    "doc_contab": "2000869769",
                    "exercicio": "2026",
                    "item": "2",
                    "origem": "",
                    "adquirente": "",
                    "cliente": "1006408",
                    "cnpj_cliente": "82525171000107",
                    "cod_raz_especial": "",
                    "num_atribuicao": "9062753536",
                    "data_lancamento": "2026-04-30",
                    "data_doc": "2026-05-28",
                    "codigo_moeda": "BRL",
                    "num_doc_ref": "002842886-6",
                    "tipo_doc": "RV",
                    "credito_debito": "S",
                    "divisao": "4002",
                    "valor": 31.88,
                    "contab_geral": "11201010",
                    "dta_calc_venc": "2026-04-30",
                    "forma_pag_financ": "@",
                    "doc_faturamento": "9062753536",
                    "doc_vendas": "2051340854",
                    "area_credito": "4014",
                    "text": "Doc. Faturamento MATERCIC M Como ref.",
                    "codigo_razao": "",
                    "doc_compensacao": "2100024124",
                    "data_compensacao": "2026-04-30",
                    "forma_pag_fatura": "Boleto a Prazo + VLoz",
                    "valor_pedido_nf": 111.72,
                    "valor_pedido_ov": 111.72,
                    "total_nf_c_desconto": 111.72,
                    "saldo_vloz_usado": 31.88,
                    "valor_boletos": 79.84,
                    "codigo_pagador": "1006408",
                    "cnpj_pagador": "82525171000107",
                    "codigo_emissor": "1006408",
                    "cnpj_emissor": "82525171000107"
                },
                {
                    "empresa": "4014",
                    "doc_contab": "2100024124",
                    "exercicio": "2026",
                    "item": "1",
                    "origem": "",
                    "adquirente": "",
                    "cliente": "1006408",
                    "cnpj_cliente": "82525171000107",
                    "cod_raz_especial": "",
                    "num_atribuicao": "9062753536",
                    "data_lancamento": "2026-04-30",
                    "data_doc": "2026-05-28",
                    "codigo_moeda": "BRL",
                    "num_doc_ref": "002842886-6",
                    "tipo_doc": "RC",
                    "credito_debito": "H",
                    "divisao": "4002",
                    "valor": 79.84,
                    "contab_geral": "11201010",
                    "dta_calc_venc": "2026-04-30",
                    "forma_pag_financ": "F",
                    "doc_faturamento": "9062754087",
                    "doc_vendas": "2051340854",
                    "area_credito": "4000",
                    "text": "Doc. Faturamento MATERCIC M Como ref.",
                    "codigo_razao": "",
                    "doc_compensacao": "2100024124",
                    "data_compensacao": "2026-04-30",
                    "forma_pag_fatura": "Boleto a Prazo + VLoz",
                    "valor_pedido_nf": 111.72,
                    "valor_pedido_ov": 111.72,
                    "total_nf_c_desconto": 111.72,
                    "saldo_vloz_usado": 31.88,
                    "valor_boletos": 79.84,
                    "codigo_pagador": "1006408",
                    "cnpj_pagador": "82525171000107",
                    "codigo_emissor": "1006408",
                    "cnpj_emissor": "82525171000107"
                },
                {
                    "empresa": "4014",
                    "doc_contab": "2100024124",
                    "exercicio": "2026",
                    "item": "2",
                    "origem": "",
                    "adquirente": "",
                    "cliente": "1006408",
                    "cnpj_cliente": "82525171000107",
                    "cod_raz_especial": "",
                    "num_atribuicao": "9062753536",
                    "data_lancamento": "2026-04-30",
                    "data_doc": "2026-05-28",
                    "codigo_moeda": "BRL",
                    "num_doc_ref": "002842886-6",
                    "tipo_doc": "RC",
                    "credito_debito": "H",
                    "divisao": "4002",
                    "valor": 31.88,
                    "contab_geral": "11201010",
                    "dta_calc_venc": "2026-04-30",
                    "forma_pag_financ": "@",
                    "doc_faturamento": "9062754087",
                    "doc_vendas": "2051340854",
                    "area_credito": "4014",
                    "text": "Doc. Faturamento MATERCIC M Como ref.",
                    "codigo_razao": "",
                    "doc_compensacao": "2100024124",
                    "data_compensacao": "2026-04-30",
                    "forma_pag_fatura": "Boleto a Prazo + VLoz",
                    "valor_pedido_nf": 111.72,
                    "valor_pedido_ov": 111.72,
                    "total_nf_c_desconto": 111.72,
                    "saldo_vloz_usado": 31.88,
                    "valor_boletos": 79.84,
                    "codigo_pagador": "1006408",
                    "cnpj_pagador": "82525171000107",
                    "codigo_emissor": "1006408",
                    "cnpj_emissor": "82525171000107"
                }
            ]
        };

        //return response.status(400).json(['deu grosópi no getConsultaCredito']);
        return response.status(200).json(jsonResponse);
    };

const getLimiteCredito =
    (request, response) => {
        const decodedUrl = decodeURIComponent(request.url);
        const limiteMatch = decodedUrl.match(/limite\(area_cred='([^']+)',cliente='([^']+)'\)\/Set/i);

        if (!limiteMatch) {
            return response.status(400).json({ error: 'Formato de URL inválido para consulta de limite' });
        }

        const areaCredito = limiteMatch[1];
        const cliente = limiteMatch[2];

        const now = new Date();
        const timestamp = now.getFullYear().toString() +
            (now.getMonth() + 1).toString().padStart(2, '0') +
            now.getDate().toString().padStart(2, '0') +
            now.getHours().toString().padStart(2, '0') +
            now.getMinutes().toString().padStart(2, '0') +
            now.getSeconds().toString().padStart(2, '0');

        var jsonResponse = {
            "@odata.context": `../$metadata#limite(area_cred='${areaCredito}',cliente='${cliente}')/Set`,
            "@odata.metadataEtag": `W/"${timestamp}"`,
            "value": [
                {
                    "kunnr": "1034742",
                    "name1": "M G C COMERCIO DE MATERIAIS DE",
                    "kkber": "4014",
                    "creditlimit": 25235.00,
                    "dbekr": 0.00,
                    "sum_opens": 19825.99,
                    "delta_to_limit": 5409.01,
                    "percentage": 78.57,
                    "open_items": 0.00,
                    "open_specials": 13247.84,
                    "open_delivery": 0.00,
                    "open_order": 6578.15,
                    "open_invoice": 0.00,
                    "cashd": null,
                    "casha": 290.20,
                    "cashc": 0.00,
                    "crblb": "",
                    "zlimite_add": 10094.00
                },
                {
                    "kunnr": "1034742",
                    "name1": "M G C COMERCIO DE MATERIAIS DE",
                    "kkber": "4008",
                    "creditlimit": 1561.43,
                    "dbekr": 0.00,
                    "sum_opens": 0.00,
                    "delta_to_limit": 37.01,
                    "percentage": 0.00,
                    "open_items": 0.00,
                    "open_specials": 0.00,
                    "open_delivery": 0.00,
                    "open_order": 1524.42,
                    "open_invoice": 0.00,
                    "cashd": null,
                    "casha": 0.00,
                    "cashc": 0.00,
                    "crblb": "",
                    "zlimite_add": 0.00
                }
            ]
        };

        //return response.status(400).json(['deu grosópi no getLimiteCredito']);
        return response.status(200).json(jsonResponse);
    };

const getEstabelecimento =
    (request, response) => {
        const queryString = request.url.split('?')[1];

        if (!queryString) {
            return response.status(400).json({ error: 'Query string não encontrada' });
        }

        const decodedQuery = decodeURIComponent(queryString);
        const estabelecimentoMatch = decodedQuery.match(/estabelecimento\s+eq\s+'([^']+)'/i);
        const filialMatch = decodedQuery.match(/filial\s+eq\s+'([^']+)'/i);
        const clienteMatch = decodedQuery.match(/cliente\s+eq\s+'([^']+)'/i);
        const cnpjMatch = decodedQuery.match(/cnpj\s+eq\s+'([^']+)'/i);
        const statusMatch = decodedQuery.match(/status\s+eq\s+'([^']+)'/i);

        if (!estabelecimentoMatch || !filialMatch || !clienteMatch || !cnpjMatch || !statusMatch) {
            return response.status(400).json({ error: 'Formato de URL inválido para consulta de estabelecimento' });
        }

        const estabelecimento = estabelecimentoMatch[1];
        const filial = filialMatch[1];
        const cliente = clienteMatch[1];
        const cnpj = cnpjMatch[1];
        const status = statusMatch[1];

        const now = new Date();
        const timestamp = now.getFullYear().toString() +
            (now.getMonth() + 1).toString().padStart(2, '0') +
            now.getDate().toString().padStart(2, '0') +
            now.getHours().toString().padStart(2, '0') +
            now.getMinutes().toString().padStart(2, '0') +
            now.getSeconds().toString().padStart(2, '0');

        const jsonResponse = {
            "@odata.context": '$metadata#estabelecimento',
            "@odata.metadataEtag": `W/"${timestamp}"`,
            "value": [
                {
                    "adquirente": "01",
                    "estabelecimento": "151853598",
                    "filial": "14122521",
                    "data": "2026-04-02",
                    "status": "ATIVO",
                    "cnpj": "05419622000172",
                    "bukrs": "4014",
                    "cliente": "1064142",
                    "data_inat": null,
                    "SAP__Messages": []
                }
            ]
        };

        const jsonResponseVazio = {
            "@odata.context": '$metadata#estabelecimento',
            "@odata.metadataEtag": `W/"${timestamp}"`,
            "value": []
        };

        //return response.status(400).json(['deu grosópi no getEstabelecimento']);
        return response.status(200).json(jsonResponseVazio);
        return response.status(200).json(jsonResponse);
    };

const testeRequestPost = (request, response) => {
    const timestamp = new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour12: false
    });

    console.log(`[${timestamp}] CHAMOU POST COM PARÂMETROS: ${JSON.stringify(request.body)}`);

    //return response.status(400).json([{ error: 'deu erro ao enviar split para o sap' }]);
    //return response.status(400).json([{ error: 'deu erro ao enviar consolidado para o sap' }]);
    //return response.status(400).json([{ error: 'deu erro cadastrar estabelecimento sap' }]);
    return response.status(200).json({
        body: request.body
    });
};

module.exports =
{
    getConsultaCredito,
    getLimiteCredito,
    getEstabelecimento,
    testeRequestPost
};
const fs = require('fs');
const crypto = require('crypto');
const { DateTime } = require('luxon');

var contador = 0;

const obterToken =
    (request, response) => {
        const privateKeyPem = fs.readFileSync('src/files/private-key.pem', 'utf8');

        const header = {
            alg: 'RS256',
            typ: 'JWT'
        };

        const nowBrasilia = DateTime.now().setZone('America/Sao_Paulo');
        const iat = Math.floor(nowBrasilia.toSeconds());

        const payload = {
            aud: 'https://proxy.api.prebanco.com.br/auth/server/v1.1/token',
            sub: 'c24d01f4-11fa-4489-bcb0-b71416387291',
            iat: iat,
            exp: iat + 3600,
            jti: iat * 1000,
            ver: '1.1'
        };

        function base64urlEncode(obj) {
            const json = typeof obj === 'string' ? obj : JSON.stringify(obj);
            return Buffer.from(json, 'utf8')
                .toString('base64')
                .replace(/=/g, '')
                .replace(/\+/g, '-')
                .replace(/\//g, '_');
        }

        const encodedHeader = base64urlEncode(header);
        const encodedPayload = base64urlEncode(payload);
        const unsignedToken = `${encodedHeader}.${encodedPayload}`;

        const signature = crypto.sign('RSA-SHA256', Buffer.from(unsignedToken, 'utf8'), {
            key: privateKeyPem,
            padding: crypto.constants.RSA_PKCS1_PADDING,
        });

        const encodedSignature = signature
            .toString('base64')
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');

        const jwt = `${unsignedToken}.${encodedSignature}`;

        const formattedBrasilia = DateTime.fromSeconds(iat, { zone: 'America/Sao_Paulo' })
            .set({ second: 0 })
            .toISO({ includeOffset: true })
            .replace(".000-03:00", "-00:00");

        const responseJson = {
            jwt: jwt,
            payload: payload,
            iatFormatted: formattedBrasilia
        };

        return response.status(200).json(responseJson);
    };

const obterBradSignatureHeader = (request, response) => {
    const privateKeyPem = fs.readFileSync('src/files/private-key.pem', 'utf8');

    function toBase64Url(buffer) {
        return buffer
            .toString('base64')
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    }

    const { token, jti, iatFormatted } = request.body;

    const body = JSON.stringify({
        tipoPesquisa: 2,
        codProdutoCobr: 0,
        numNegociacao: 0,
        cpfCnpjBenef: 31759488,
        filialCpfCnpjBenef: 0,
        ctrlCpfCnpjBenef: 55,
        dataPagtoInic: 1052025,
        dataPagtoFim: 14062025,
        cpfCnpjPagador: 0,
        filialCpfCnpjPagador: 0,
        ctrlCpfCnpjPagador: 0,
        restart: 0,
        qtdeRegPorPagina: 999
    });

    const params = '';

    const contentToSign = [
        'POST',
        '/v1/cbon/consulta-dados-portador/boletos-pagos',
        params,
        body,
        token,
        jti,
        iatFormatted,
        'SHA256'
    ].join('\n'); // Unix (LF)

    const signature = crypto.sign('sha256', Buffer.from(contentToSign, 'utf8'), {
        key: privateKeyPem,
        padding: crypto.constants.RSA_PKCS1_PADDING,
    });

    const assinatura = toBase64Url(signature);
    return response.status(200).json({ assinatura: assinatura, conteudo: contentToSign });
}

const mockedToken = (request, response) => {
    try {
        const file = 'src/mocked_responses/bradesco_mocked_token.json';

        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                return response.status(500).json({ error: 'Erro ao ler o arquivo', details: err });
            }

            const result = JSON.parse(data);
            //return response.status(400).json(null);
            return response.status(200).json(result);
        });
    } catch (error) {
        return response.status(500).json({ error: 'Erro interno do servidor', details: error });
    }
}

// PAGINADO
// const mockedObterBoletos = (request, response) => {
//     try {
//         const file = 'src/mocked_responses/bradesco_mocked_full.json';
//         fs.readFile(file, 'utf8', (err, data) => {
//             if (err) {
//                 return response.status(500).json({ error: 'Erro ao ler o arquivo', details: err });
//             }

//             const result = JSON.parse(data);
//             const lista = result.listaDePagamentos || [];

//             // Pega os parâmetros do request
//             const restart = parseInt(request.body.restart) || 0;
//             let qtdeRegPorPagina = parseInt(request.body.qtdeRegPorPagina);
//             if (isNaN(qtdeRegPorPagina) || qtdeRegPorPagina < 1) qtdeRegPorPagina = 50;

//             // Calcula o slice da lista
//             const startIdx = restart;
//             const endIdx = Math.min(startIdx + qtdeRegPorPagina, lista.length);
//             const page = lista.slice(startIdx, endIdx);

//             // Calcula o próximo restart e maisPaginas
//             let nextRestart = 0;
//             let maisPaginas = 'N';
//             if (endIdx < lista.length) {
//                 nextRestart = endIdx;
//                 maisPaginas = 'S';
//             }

//             // Monta o payload paginado
//             const paginatedResult = {
//                 ...result,
//                 listaDePagamentos: page,
//                 restart: nextRestart,
//                 maisPaginas: maisPaginas,
//                 qtdeOcorr: page.length
//             };

//             console.log("maisPaginas: " + maisPaginas + ", restart: " + nextRestart + ", qtdeOcorr: " + page.length);

//             if (maisPaginas === 'N') {
//                 console.log("------- FIM DA PAGINA -------");
//             }

//             return response.status(200).json(paginatedResult);
//         });
//     } catch (error) {
//         return response.status(500).json({ error: 'Erro interno do servidor', details: error });
//     }
// }

// ESTATICO
// const mockedObterBoletos = (request, response) => {
//     try {
//         // const file = 'src/mocked_responses/bradesco_mocked_full.json';
//         const file = 'src/mocked_responses/bradesco_mocked_full_custom.json';

//         fs.readFile(file, 'utf8', (err, data) => {
//             if (err) {
//                 return response.status(500).json({ error: 'Erro ao ler o arquivo', details: err });
//             }

//             const result = JSON.parse(data);

//             const payloadError = {
//                 codigoMensagem: "CBTT0049",
//                 mensagem: "CNPJ/CPF inválido."
//             };

//             const payloadPreconditionFailed = {
//                 ctrlCpfCnpjBenef: "Campo maior que 2 dígitos."
//             };

//             contador++;
//             console.log(`Contador: ${contador}`);

//             if (contador >= 1) {
//                 result.maisPaginas = 'N';
//                 result.restart = 0;
//             }

//             //return response.status(400).json(payloadError);
//             //return response.status(412).json(payloadPreconditionFailed);
//             //return response.status(200).json(null);
//             return response.status(200).json(result);
//         });
//     } catch (error) {
//         return response.status(500).json({ error: 'Erro interno do servidor', details: error });
//     }
// }

// DINAMICO
const mockedObterBoletos = (request, response) => {
    const { cpfCnpjBenef } = request.body;
    console.log(cpfCnpjBenef);

    const payload = generatePagamentos(100);

    contador++;
    console.log(`Contador: ${contador}`);

    if (contador >= 100) {
        payload.maisPaginas = 'N';
        payload.restart = 0;
        console.log('FIM DA PAGINA');
        contador = 0;
    }

    // if (cpfCnpjBenef === 60850229) {
    //     const payloadPreconditionFailed = {
    //         cpfCnpjBenef: "deu ruim no bereguejonhson"
    //     };

    //     return response.status(412).json(payloadPreconditionFailed);
    // }

    return response.status(200).json(payload);
}

function gerarDataAleatoria() {
    const ano = getRandomInt(1900, 2099);
    const mes = getRandomInt(1, 12);
    const ultimoDia = new Date(ano, mes, 0).getDate();
    const dia = getRandomInt(1, ultimoDia);

    const dd = String(dia).padStart(2, '0');
    const mm = String(mes).padStart(2, '0');
    const yyyy = String(ano);

    return parseInt(`${dd}${mm}${yyyy}`);
}

function gerarHorarioAleatorio() {
    const hora = getRandomInt(0, 23);
    const minuto = getRandomInt(0, 59);
    const segundo = getRandomInt(0, 59);

    const hh = String(hora).padStart(2, '0');
    const mm = String(minuto).padStart(2, '0');
    const ss = String(segundo).padStart(2, '0');

    return parseInt(`${hh}${mm}${ss}`);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCpfCnpj() {
    return getRandomInt(100000000, 999999999);
}

function getRandomCtrl() {
    return getRandomInt(10, 99);
}

function getRandomNome() {
    // const nomes = [
    //     "JOAO SILVA", "MARIA OLIVEIRA", "CARLOS SOUZA", "ANA LIMA", "PEDRO ALVES",
    //     "LUCAS PEREIRA", "JULIA COSTA", "MATEUS GOMES", "LARISSA MORAES", "FELIPE RAMOS"
    // ];
    // return nomes[getRandomInt(0, nomes.length - 1)] + " " + crypto.randomBytes(2).toString('hex');
    return crypto.randomBytes(6).toString('hex').toUpperCase();
}

function getRandomCodigoBarras() {
    let codigo = '';
    for (let i = 0; i < 44; i++) {
        codigo += getRandomInt(0, 9);
    }
    return codigo;
}

function getRandomLinhaDigitavel() {
    let linha = '';
    for (let i = 0; i < 47; i++) {
        linha += getRandomInt(0, 9);
    }
    return linha;
}

function generatePagamentos(qtde = 999) {
    const pagamentos = [];
    const usados = new Set();

    for (let i = 0; i < qtde; i++) {
        let cpfCnpjPagador, cpfCnpjPortador;
        do {
            cpfCnpjPagador = getRandomCpfCnpj();
        } while (usados.has(cpfCnpjPagador));
        usados.add(cpfCnpjPagador);

        do {
            cpfCnpjPortador = getRandomCpfCnpj();
        } while (usados.has(cpfCnpjPortador));
        usados.add(cpfCnpjPortador);

        pagamentos.push({
            nomePagador: getRandomNome(),
            tipoPessoaPagador: 1,
            cpfCnpjPagador,
            filialCnpjPagador: 0,
            ctrlCpfCnpjPagador: getRandomCtrl(),
            nomePortador: getRandomNome(),
            tipoPessoaPortador: 1,
            cpfCnpjPortador,
            filialCnpjPortador: 0,
            ctrlCpfCnpjPortador: getRandomCtrl(),
            valorBoleto: getRandomInt(10, 1000),
            valorPago: getRandomInt(10, 1000),
            canalPagamento: getRandomInt(1, 5),
            meioPagamento: getRandomInt(1, 3),
            codigoBarras: getRandomCodigoBarras(),
            linhaDigitavel: getRandomLinhaDigitavel(),
            dataPagtoTitulo: gerarDataAleatoria(),
            horaPagtoTitulo: gerarHorarioAleatorio(),
            bancoRecebedor: getRandomInt(1, 999)
        });
    }

    return {
        httpStatusCode: "206",
        codMensagem: "CBTT0018",
        mensagem: "CONSULTA EFETUADA. EXISTEM MAIS INFORMAÃ‡Ã•ES A SEREM DEMONSTRADAS",
        restart: 999,
        maisPaginas: "S",
        qtdeOcorr: qtde,
        listaDePagamentos: pagamentos
    };
}

module.exports =
{
    obterToken,
    obterBradSignatureHeader,
    mockedToken,
    mockedObterBoletos
};

// Exemplo erro 401
// {
//     "code": "105",
//     "message": "invalidÂ issuanceÂ timeÂ (iat)",
//     "details": null
// }

// Exemplo erro 400
// {
//     "codigoMensagem": "CBTT0049",
//     "mensagem": "CNPJ/CPF invÃ¡lido."
// }

// Exemplo erro 400
// {
//     "code": "104",
//     "message": "invalid signature",
//     "details": "null"
// }

// Exemplo erro 412
// {
//     "ctrlCpfCnpjBenef": "Campo maior que 2 dÃ­gitos"
// }
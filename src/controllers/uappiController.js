const jwt = require('jsonwebtoken');
const fs = require('fs');

const obterToken =
    (request, response) => {
        const data = {
            userId: 123456,
            username: 'bruno.noguchi'
        };

        const token = jwt.sign(data, 'suaChaveSecreta', { algorithm: 'HS256' });

        const payload = {
            token: token
        };

        const payloadError = {
            error: "Requisição rejeitada.",
            details: ["Credenciais incorretas"]
        };

        // return response.status(400).json(payloadError);
        return response.status(200).json(payload);
    };

const productsStockBatch =
    (request, response) => {
        const payload = {
            id: Math.floor(Math.random() * 10000) + 1
        };

        const payloadError = {
            error: "Requisição rejeitada.",
            details: ["O SKU 'TESTEAPISIMPLES' já está cadastrado"]
        };

        return response.status(400).json(payloadError);
        return response.status(200).json(payload);
    };

const productsPriceBatch =
    (request, response) => {
        // /* ============ CENÁRIO DE ERRO 500 ============ */
        // const payloadError500 = {
        //     error: "Throw Exception 500",
        //     details: ["Vestibulum fringilla pede sit amet"]
        // };

        // return response.status(500).json(payloadError500);

        const payload = {
            id: Math.floor(Math.random() * 10000) + 1
        };

        return response.status(200).json(payload);
    };

const updateOrderStatus =
    (request, response) => {
        const { numeroPedido } = request.params;
        const { status } = request.body;

        console.log('Params: ', request.params);
        console.log('Body: ', request.body);

        const payloadError = {
            error: "Requisição rejeitada.",
            details: ["Mensagem de Erro Atualização de Status Order"]
        };

        // return response.status(400).json(payloadError);
        return response.status(204).send();
    };

const ping =
    (request, response) => {
        return response.status(200).json("pong");
    };


const getOrder =
    (request, response) => {
        // /* ============ CENÁRIO DE ERRO 400 ============ */
        // const payloadError400 = {
        //     error: "Bad Request",
        //     details: ["Dados inválidos"]
        // };

        // return response.status(400).json(payloadError400);

        /* ============ CENÁRIO DE ERRO 401 ============ */
        // const payloadError401 = {
        //     error: "Não autorizado",
        //     details: ["Falha de autenticação do token"]
        // };

        // return response.status(401).json(payloadError401);

        /* ============ CENÁRIO DE ERRO 404 ============ */
        // const payloadError404 = {
        //     error: "Pedido não encontrado",
        //     details: ["Pedido não encontrado"]
        // };

        // return response.status(404).json(payloadError404);

        /* ============ CENÁRIO DE ERRO 500 ============ */
        // const payloadError500 = {
        //     error: "Throw Exception 500",
        //     details: ["Vestibulum fringilla pede sit amet"]
        // };

        // return response.status(500).json(payloadError500);

        /* ============ CENÁRIO DE OK 200 ============ */
        try {
            const filePathOriginal = 'src/dados_mocked_pedido_uappii.json';
            const filePathMobiis = 'src/dados_mocked_pedido_mobiis.json';

            fs.readFile(filePathMobiis, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }

                const jsonData = JSON.parse(data);
                return response.status(200).json(jsonData);
            });

        } catch (error) {
            return response.status(500).json([error]);
        }
    };


module.exports =
{
    obterToken,
    productsStockBatch,
    updateOrderStatus,
    getOrder,
    ping,
    productsPriceBatch
};

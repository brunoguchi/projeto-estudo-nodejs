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
            token: token,
            expirationTime: '2024-12-30 00:00:00'
        };

        const payloadError = {
            error: "Requisição rejeitada.",
            details: ["Credenciais incorretas"]
        };

        // return response.status(400).json(payloadError);
        return response.status(200).json(payload);
    };

const ping =
    (request, response) => {
        return response.status(200).json("pong");
    };


const getProduct =
    (request, response) => {
        try {
            const filePathMobiis = 'src/dados_mocked_simplus.json';

            fs.readFile(filePathMobiis, 'utf8', (err, data) => {
                if (err) {
                    return response.status(500).json({ error: 'Erro ao ler o arquivo', details: err });
                }

                const jsonData = JSON.parse(data);
                const result = { produtos: jsonData };

                return response.status(200).json(result);
                //return response.status(200).json([{ pessoaFisicaId: 251461, precificacaoDaTurmaId: 123456 }]);
            });
        } catch (error) {
            return response.status(500).json({ error: 'Erro interno do servidor', details: error });
        }
    };


module.exports =
{
    obterToken,
    getProduct,
    ping
};

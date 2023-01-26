const jwt = require('jsonwebtoken');
const fs = require('fs');

const ping =
    (request, response) => {
        return response.status(200).json("pong");
    };


const getProduct =
    (request, response) => {
        const { query } = request.query;
        // console.log("Params: ", query);

        try {
            const filePathMobiis = 'src/dados_mocked_bluesoft.json';

            fs.readFile(filePathMobiis, 'utf8', (err, data) => {
                if (err) {
                    return response.status(500).json({ error: 'Erro ao ler o arquivo', details: err });
                }

                const jsonData = JSON.parse(data);
                return response.status(200).json(jsonData);
            });
        } catch (error) {
            return response.status(500).json({ error: 'Erro interno do servidor', details: error });
        }
    };


module.exports =
{
    getProduct,
    ping
};

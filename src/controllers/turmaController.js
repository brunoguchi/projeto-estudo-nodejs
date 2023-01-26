const fs = require('fs');

const filePath = 'src/dados_mocked.json';

const salvar =
    (request, response) => {

        try {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }

                const jsonData = JSON.parse(data);
                return response.status(200).json(jsonData);
            });

        } catch (error) {
            return response.status(400).json([error]);
        }
    };

module.exports =
{
    salvar
};

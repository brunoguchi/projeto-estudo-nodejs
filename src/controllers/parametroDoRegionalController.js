const cadastrar =
    (request, response) => {
        const { identificador } = request.body;
        //return response.status(400).json(['deu grosópi no cadastrar parametro']);
        return response.status(200).json({ id: 12345, identificador: identificador });
    };

const obterPorId =
    (request, response) => {
        const { identificador } = request.body;
        //return response.status(400).json(['deu grosópi no cadastrar parametro']);
        return response.status(200).json({ id: 12345, identificador: identificador });
    };

module.exports =
{
    cadastrar,
    obterPorId
};

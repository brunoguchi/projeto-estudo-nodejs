const cadastrar =
    (request, response) => {
        const { identificador } = request.body;
        //return response.status(400).json(['deu grosópi no cadastrar parametro']);
        return response.status(200).json({ id: 12345, identificador: identificador });
    };

const obterPorId =
    (request, response) => {
        var payload = {
            id: 12345,
            situacao: false,
            identificador: 'MeuParametroDeTeste',
            descricao: 'parametro do bereguejohnson',
            categoria: 1,
            aplicacao: 2,
            tipoDoParametro: 4
        };

        // return response.status(400).json(['deu grosópi no obter parametro']);
        return response.status(200).json(payload);
    };

module.exports =
{
    cadastrar,
    obterPorId
};

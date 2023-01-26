const alterarResultadoFinal =
    (request, response) => {

        console.debug('bateu no alterarResultadoFinal');

        // return response.status(400).json(['deu grosópi no alterarResultadoFinal']);
        return response.status(200).json(true);
    };

const permitirAlterarResultadoFinal =
    (request, response) => {
        return response.status(200).json(true);
    };

module.exports =
{
    alterarResultadoFinal,
    permitirAlterarResultadoFinal
};

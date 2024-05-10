const alterarEstadoPorUC =
    (request, response) => {

        console.log('bateu no alterarEstadoPorUC');

        return response.status(400).json(['deu grosópi']);
        return response.status(200).json(true);
    };

module.exports =
{
    alterarEstadoPorUC,
};

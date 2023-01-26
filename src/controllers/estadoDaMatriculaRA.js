const alterarEstadoDaMatriculaRA =
    (request, response) => {

        console.log('bateu no alterarEstadoDaMatriculaRA');

        // return response.status(400).json(['deu grosópi no alterarEstadoDaMatriculaRA']);
        return response.status(200).json(true);
    };

const permitirAlterarParaDesistente =
    (request, response) => {
        return response.status(200).json(true);
    };

const permitirAlterarParaEvadido =
    (request, response) => {
        return response.status(200).json(true);
    };

const alterarEstadoDaMatriculaRAParaTransferido =
    (request, response) => {

        console.log('bateu no alterarEstadoDaMatriculaRAParaTransferido');

        // return response.status(400).json(['deu grosópi no alterarEstadoDaMatriculaRAParaTransferido']);
        return response.status(200).json(true);
    };

const alterarEstadoDaMatriculaRAParaMatriculaSaidaIntermediaria =
    (request, response) => {

        console.log('bateu no alterarEstadoDaMatriculaRAParaMatriculaSaidaIntermediaria');

        // return response.status(400).json(['deu grosópi no alterarEstadoDaMatriculaRAParaMatriculaSaidaIntermediaria']);
        return response.status(200).json(true);
    };

module.exports =
{
    alterarEstadoDaMatriculaRA,
    permitirAlterarParaDesistente,
    permitirAlterarParaEvadido,
    alterarEstadoDaMatriculaRAParaTransferido,
    alterarEstadoDaMatriculaRAParaMatriculaSaidaIntermediaria
};

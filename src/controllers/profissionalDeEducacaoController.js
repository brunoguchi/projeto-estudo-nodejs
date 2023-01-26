const obterDistratosEContratoRealizadosPorTratamentoDeVacancia =
    (request, response) => {
        var payload = {
            contratoDoProfissionalDeEducacaoId: 123,
            distratoIds: [],
        };

        return response.status(200).json(payload);
    };

const gerarContratoETermo =
    (request, response) => {
        return response.status(400).json(['Mensagem de erro padrão do SIG']);
        return response.status(200).json([1, 2, 3]);
        return response.status(200).json();
    };

const emitirConvocacao =
    (request, response) => {
        //return response.status(400).json(['Mensagem de erro padrão do SIG - emitirConvocacao']);
        return response.status(200).json(123456);
        return response.status(200).json();
    };

const emitirDistrato =
    (request, response) => {
        return response.status(400).json(['Mensagem de erro padrão do SIG - emitirDistrato']);
        return response.status(200).json([1, 2, 3]);
        return response.status(200).json();
    };

module.exports =
{
    obterDistratosEContratoRealizadosPorTratamentoDeVacancia,
    gerarContratoETermo,
    emitirConvocacao,
    emitirDistrato
};
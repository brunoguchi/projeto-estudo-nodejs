const obterFaixasSalariais =
    (request, response) => {
        const { nivelFaixaId } = request.params;
        var payload = [
            {
                id: 1,
                tipo: 1,
                modalidadeDescricao: 'Formação Inicial e Continuada',
                valor: 123.45,
                codigoDeIntegracaoFolha: 12345,
                dataInicialDoPeriodoDeVigencia: new Date('2023-01-01 00:00:00'),
                dataFinalDoPeriodoDeVigencia: new Date('2023-12-20 00:00:00'),
                valorAlterado: false
            },
            {
                id: 2,
                tipo: 1,
                modalidadeDescricao: 'Educação Profissional Técnica do Ensino Médio',
                valor: 25.89,
                codigoDeIntegracaoFolha: 1254,
                dataInicialDoPeriodoDeVigencia: new Date('2023-01-01 00:00:00'),
                dataFinalDoPeriodoDeVigencia: new Date('2023-12-20 00:00:00'),
                valorAlterado: true
            },
            {
                id: 3,
                tipo: 1,
                modalidadeDescricao: 'Educação Superior',
                valor: 25.89,
                codigoDeIntegracaoFolha: 1254,
                dataInicialDoPeriodoDeVigencia: new Date('2023-01-01 00:00:00'),
                dataFinalDoPeriodoDeVigencia: new Date('2023-12-20 00:00:00'),
                valorAlterado: true
            },
            {
                id: 4,
                tipo: 2,
                modalidadeDescricao: '',
                valor: 46.23,
                codigoDeIntegracaoFolha: 6124,
                dataInicialDoPeriodoDeVigencia: new Date('2023-01-01 00:00:00'),
                dataFinalDoPeriodoDeVigencia: new Date('2023-12-20 00:00:00'),
                valorAlterado: false
            },
            {
                id: 5,
                tipo: 3,
                modalidadeDescricao: '',
                valor: 78.63,
                codigoDeIntegracaoFolha: 7896,
                dataInicialDoPeriodoDeVigencia: new Date('2023-01-01 00:00:00'),
                valorAlterado: false
            },
            {
                id: 6,
                tipo: 4,
                modalidadeDescricao: '',
                valor: 12.45,
                dataInicialDoPeriodoDeVigencia: new Date('2023-01-01 00:00:00'),
                dataFinalDoPeriodoDeVigencia: new Date('2023-12-20 00:00:00'),
                valorAlterado: true
            }
        ];

        return response
            .status(200)
            //.json();
            .json(payload);
    };

// AcaoEducacional = 1,
// AcaoExtensiva = 2,
// ServicoPedagogico = 3,
// EscolaAberta = 4

module.exports =
{
    obterFaixasSalariais,
};

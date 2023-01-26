const atualizarFaixas =
    (request, response) => {
        return response.status(200).json(true);
        // return response.status(400).json(['cebolinha']);
    };

const obterPorId = (request, response) => {
    const { faixaId } = request.params;

    // Id de uma faixa de Ação Educacional
    if (+faixaId === 2107) {
        var payload = {
            id: +faixaId,
            nivelDeFaixaSalarialId: 130,
            valorDaHoraAula: 300.89,
            tipo: 1,
            modalidadeId: 1,
            codigoDeIntegracaoFolha: '123456',
            tiposDeAcao: [
                { tipoDeAcaoId: 1 },
                { tipoDeAcaoId: 5 },
                { tipoDeAcaoId: 6 },
                { tipoDeAcaoId: 18 }
            ],
            situacao: true,
            permiteAlteracaoDeValor: false
        };

        return response.status(200).json(payload);
    }

    // Id de uma faixa de Ação Extensiva
    if (+faixaId === 2109) {
        var payload = {
            id: +faixaId,
            nivelDeFaixaSalarialId: 130,
            valorDaHoraAula: 300.89,
            tipo: 2,
            modalidadeId: null,
            codigoDeIntegracaoFolha: '123456',
            tiposDeAcao: [
                { tipoDeAcaoId: 7 },
                { tipoDeAcaoId: 9 },
                { tipoDeAcaoId: 10 }
            ],
            situacao: true,
            permiteAlteracaoDeValor: false
        };

        return response.status(200).json(payload);
    }

    // Id de uma faixa de Serviço Pedagógico
    if (+faixaId === 2110) {
        var payload = {
            id: +faixaId,
            nivelDeFaixaSalarialId: 130,
            valorDaHoraAula: 300.89,
            tipo: 3,
            modalidadeId: null,
            codigoDeIntegracaoFolha: null,
            tiposDeServicoPedagogico: [1, 3, 5, 12, 17],
            situacao: true,
            permiteAlteracaoDeValor: false
        };

        return response.status(200).json(payload);
    }

    // Id de uma faixa de Escola Aberta
    if (+faixaId === 2111) {
        var payload = {
            id: +faixaId,
            nivelDeFaixaSalarialId: 130,
            valorDaHoraAula: 54.23,
            tipo: 4,
            codigoDeIntegracaoFolha: null,
            situacao: true,
            permiteAlteracaoDeValor: false
        };

        return response.status(200).json(payload);
    }

    return response.status(400).json(['Faixa Salarial não encontrada...']);
};

// AcaoEducacional = 1,
// AcaoExtensiva = 2,
// ServicoPedagogico = 3,
// EscolaAberta = 4

const obterHistorico =
    (request, response) => {
        const { faixaId } = request.params;

        var payload = [{
            dataInicialDoPeriodoDeVigencia: new Date('2023-01-01 00:00:00'),
            dataFinalDoPeriodoDeVigencia: null,
            valorDaHoraAula: 0.01,
            nomeUsuario: "Nome do Usuário",
            dataHoraOperacao: new Date('2023-01-01 00:00:00'),
            operacao: 1
        },
        {
            dataInicialDoPeriodoDeVigencia: new Date('2023-01-01 00:00:00'),
            dataFinalDoPeriodoDeVigencia: new Date('2023-12-31 00:00:00'),
            valorDaHoraAula: 1238.65,
            nomeUsuario: "Nome do Usuário",
            dataHoraOperacao: new Date('2023-10-23 15:18:31'),
            operacao: 2
        }
        ];

        return response.status(200).json(payload);
    };

module.exports =
{
    atualizarFaixas,
    obterPorId,
    obterHistorico
};

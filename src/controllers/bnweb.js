const acessos = {
    Liberado: 1,
    Pendente: 2,
    NaoLiberado: 3
};

const obterTipoAcessoBnWeb =
    (request, response) => {
        return response.status(200).json(acessos.Liberado);
    };

const listarContas =
    (request, response) => {

        const jsonResponse = [{
            matricula: "04365277903",
            nome: "Fabiano Bonvino2",
            nome_ori: "Fabiano luiz",
            sexo: "M",
            dt_nasc: "31/07/1988",
            dt_cadastro: "08/11/2017",
            email: "fabiano.bonvino@db1.com.br",
            ddd_telefone: "044",
            telefone: "991273030",
            cpf: "04365277903",
            rg: "97623170",
            nome_pai: "jose",
            nome_mae: "maria",
            end_logradouro: "rua marfim",
            end_numero: "88",
            empresta: "0",
            empresa: "0",
            cod_unidade: "14",
            cod_categoria: "1",
            situacao: "NR",
            validade: "30/06/2024"
        }];

        return response.status(200).json(jsonResponse);
    };

const resumoEmprestimos =
    (request, response) => {

        const jsonResponse = {
            totalEmprestimos: 10,
            totalEmprestimosEmAndamento: 8,
            totalEmprestimosEmAtraso: 2,
            valorTotalMulta: 1239.65,
            totalMultasEmAberto: 5,
        };

        return response.status(200).json(jsonResponse);
    };

const alterarPermissaoEmprestimo =
    (request, response) => {
        console.debug('bateu no alterarPermissaoEmprestimo');
        return response.status(204).json();
    };

const listarRegionais = (request, response) => {
    const jsonResponse = {
        regionais: [
            {
                regionalId: 1,
                regionalNome: "Departamento Regional de São Paulo",
                regionalUf: "SP",
                regionalSigla: "DR-SP",
                matriculas: [
                    {
                        turmaCodigoFormatado: "2024.51.1",
                        turmaNome: "Turma de teste 1 só pra exemplificar um nome grande da peste que pode ter essa turma",
                        matriculaRaId: 123456,
                        estadoMatricula: 2,
                        dataCadastro: null,
                        situacao: 2
                    }, {
                        turmaCodigoFormatado: "2024.51.2",
                        turmaNome: "Turma de teste 2",
                        matriculaRaId: 789456,
                        estadoMatricula: 3,
                        dataCadastro: "2024-04-15T12:34:23",
                        situacao: 3
                    }
                ]
            },
            {
                regionalId: 1,
                regionalNome: "Departamento Regional do Acre",
                regionalUf: "AC",
                regionalSigla: "DR-AC",
                matriculas: [
                    {
                        turmaCodigoFormatado: "2024.197.1",
                        turmaNome: "Turma de teste 3",
                        matriculaRaId: 687511,
                        estadoMatricula: 2,
                        dataCadastro: "2024-04-15T10:30:52",
                        situacao: 3
                    }, {
                        turmaCodigoFormatado: "2024.197.2",
                        turmaNome: "Turma de teste 4",
                        matriculaRaId: 1268752,
                        estadoMatricula: 3,
                        dataCadastro: "2024-04-15T12:34:23",
                        situacao: 2
                    }
                ]
            }
        ],
        emprestimos: [
            {
                regionalId: 1,
                nomeObra: "Aventuras na Netoland Com Luccas Neto",
                dataEmprestimo: "2024-05-03T15:33:01",
                dataPrevisaoDevolucao: "2024-05-03T17:00:00",
                diasAtraso: 0,
                situacao: 1
            }
        ],
        multas: [
            {
                regionalId: 1,
                regionalUf: "MS",
                contratoId: 1054128,
                contratoNumeroAmigavel: "2024.51.159",
                contratoUnidadeOperativaId: 51,
                nomeObra: "Novo documento veirano",
                dataEmissao: "2024-05-02T20:44:06",
                dataVencimento: "2024-05-03T14:34:21.906",
                valor: 85.00,
                parcelaId: 1439584,
                parcelaSituacao: 2,
                origemDaMatricula: 3
            }
        ]
    };

    return response.status(200).json(jsonResponse);
};

const habilitarConta =
    (request, response) => {
        const jsonResponse = [{
            matriculaRaId: 123456,
            estadoMatricula: 0,
            dataCadastro: new Date('2024-12-31 00:00:00'),
        }];

        return response.status(200).json(jsonResponse);
    };

module.exports =
{
    obterTipoAcessoBnWeb,
    listarContas,
    resumoEmprestimos,
    alterarPermissaoEmprestimo,
    listarRegionais,
    habilitarConta
};
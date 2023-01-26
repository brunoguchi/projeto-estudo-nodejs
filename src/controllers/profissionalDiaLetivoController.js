const obterProfissionaisSubstituidos =
    (request, response) => {
        const { colaboradorId, turmaUnidadeCurricularDoPlanoDoCursoId } = request.params;

        var payload = [{
            id: 1,
            nome: 'Lara Croft',
            formaDeContratacao: 'Mensalista',
            vinculoContratual: 'Docente',
            faixaLivre: true,
            substituicoes: [{
                id: '3c254b04-98e0-4961-af87-971db9d768f9',
                tipoDeDocumentoId: 123,
                possuiJustificativa: true,
                justificativa: 'bla bla bla bla',
                receberaPelosDiasAusentes: true,
                diasSubstituidos: [{
                    id: 1,
                    data: '02/10/2023',
                    nomeDiaDaSemana: 'Segunda-Feira',
                    horarioInicio: '08:00',
                    horarioTermino: '17:00',
                    tempoHoraAulaTotal: 9,
                    tempoHoraAulaTotalSemCorrecao: 9,
                    possuiGrupo: true,
                    nomeGrupo: 'grupo 1',
                    nomeTema: 'tema 1',
                    possuiMaisDeUmProfissionalAlocado: true,
                    agrupado: true,
                    eventosAgrupadosNomes: ['evento 1', 'evento 2'],
                    profissionalSubstituto: 'Lara Croft (Substituido)',
                    profissionalSubstituido: 'Super Mario (Substituto)',
                    estadoDoDiaLetivo: 1,
                    possuiRegistroNoDiario: false
                }, {
                    id: 2,
                    data: '03/10/2023',
                    nomeDiaDaSemana: 'Terça-Feira',
                    horarioInicio: '08:00',
                    horarioTermino: '17:00',
                    tempoHoraAulaTotal: 9,
                    tempoHoraAulaTotalSemCorrecao: 9,
                    possuiGrupo: true,
                    nomeGrupo: 'grupo 1',
                    nomeTema: 'tema 1',
                    possuiMaisDeUmProfissionalAlocado: true,
                    agrupado: true,
                    eventosAgrupadosNomes: ['evento 1', 'evento 2'],
                    profissionalSubstituto: 'Lara Croft (Substituido)',
                    profissionalSubstituido: 'Super Mario (Substituto)',
                    estadoDoDiaLetivo: 1,
                    possuiRegistroNoDiario: false
                }]
            }, {
                id: '9e76a179-c0ec-4889-9114-deaa8108bc85',
                tipoDeDocumentoId: 321,
                possuiJustificativa: false,
                justificativa: '',
                receberaPelosDiasAusentes: false,
                diasSubstituidos: [{
                    id: 3,
                    data: '04/10/2023',
                    nomeDiaDaSemana: 'Quarta-Feira',
                    horarioInicio: '08:00',
                    horarioTermino: '15:00',
                    tempoHoraAulaTotal: 7,
                    tempoHoraAulaTotalSemCorrecao: 7,
                    possuiGrupo: false,
                    nomeGrupo: '',
                    nomeTema: '',
                    possuiMaisDeUmProfissionalAlocado: true,
                    agrupado: false,
                    eventosAgrupadosNomes: [],
                    profissionalSubstituto: 'Lara Croft (Substituido)',
                    profissionalSubstituido: 'Donkey Kong (Substituto)',
                    estadoDoDiaLetivo: 1,
                    possuiRegistroNoDiario: false
                }]
            }
            ]
        }, {
            id: 2,
            nome: 'Ezio Auditore da Firenze',
            formaDeContratacao: 'Mensalista',
            vinculoContratual: 'Docente',
            faixaLivre: false,
            substituicoes: [{
                id: '1de37add-8568-4646-9a0c-6cc9f805e007',
                tipoDeDocumentoId: 321,
                possuiJustificativa: false,
                justificativa: '',
                receberaPelosDiasAusentes: false,
                diasSubstituidos: [{
                    id: 4,
                    data: '05/10/2023',
                    nomeDiaDaSemana: 'Quinta-Feira',
                    horarioInicio: '08:00',
                    horarioTermino: '16:00',
                    tempoHoraAulaTotal: 8,
                    tempoHoraAulaTotalSemCorrecao: 9,
                    possuiGrupo: true,
                    nomeGrupo: 'grupo XYQ',
                    nomeTema: 'tema XYQ',
                    possuiMaisDeUmProfissionalAlocado: false,
                    agrupado: false,
                    eventosAgrupadosNomes: [],
                    profissionalSubstituto: 'Ezio Auditore da Firenze (Substituido)',
                    profissionalSubstituido: 'Nathan Drake (Substituto)',
                    estadoDoDiaLetivo: 1,
                    possuiRegistroNoDiario: false
                }, {
                    id: 5,
                    data: '06/10/2023',
                    nomeDiaDaSemana: 'Sexta-Feira',
                    horarioInicio: '08:00',
                    horarioTermino: '16:00',
                    tempoHoraAulaTotal: 8,
                    tempoHoraAulaTotalSemCorrecao: 9,
                    possuiGrupo: false,
                    nomeGrupo: '',
                    nomeTema: '',
                    possuiMaisDeUmProfissionalAlocado: false,
                    agrupado: false,
                    eventosAgrupadosNomes: [],
                    profissionalSubstituto: 'Ezio Auditore da Firenze (Substituido)',
                    profissionalSubstituido: 'Nathan Drake (Substituto)',
                    estadoDoDiaLetivo: 1,
                    possuiRegistroNoDiario: false
                }]
            }
            ]
        }
        ];

        return response.status(200).json(payload);
    };

const salvar =
    (request, response) => {
        //return response.status(400).json(['erro do salvarAlocacao']);
        return response.status(200).json();
    };

module.exports =
{
    obterProfissionaisSubstituidos,
    salvar
};

const express = require('express');
const testeController = require('./controllers/testeController');
const nivelFaixaSalarialController = require('./controllers/nivelFaixaSalarialController')
const faixaSalarialController = require('./controllers/faixaSalarialController')
const profissionalDiaLetivoController = require('./controllers/profissionalDiaLetivoController')
const precificacaoDaTurmaController = require('./controllers/precificacaoDaTurmaController')
const profissionalDeEducacaoController = require('./controllers/profissionalDeEducacaoController')
const alocacaoContratoDoColaboradorFaixaSalarialController = require('./controllers/alocacaoContratoDoColaboradorFaixaSalarialController')
const turmaController = require('./controllers/turmaController')
const bnwebController = require('./controllers/bnweb')
const gestaoAlunoController = require('./controllers/gestaoDoAlunoController')
const estadoDaMatriculaRAController = require('./controllers/estadoDaMatriculaRA')
const alunosDaTurmaController = require('./controllers/alunosDaTurma')
const parametroDoRegional = require('./controllers/parametroDoRegionalController')

const router = express.Router();

// AssinaturaDeComboDeCurso
router.get('/api/AssinaturaDeComboDeCurso/Combo/:comboId/FormasDePagamento', testeController.obterFormasDePagamento);
router.get('/api/AssinaturaDeComboDeCurso/Combo/:comboId/:pessoaId/:tipoPessoa/ValidarInadimplencia/', testeController.validarInadiplenciaDoResponsavel);
router.get('/api/AssinaturaDeComboDeCurso/Combo/GerarIdentificadorUnico/', testeController.gerarIdentificador);
router.post('/api/AssinaturaDeComboDeCurso/armazenar', testeController.armazenar);

// GestaoDeMateriais
router.get('/api/GestaoDeMateriais/', testeController.listarListasPadroesDeMateriais);

// AutorizacaoDeExecucaoDoPlanoDoCurso
router.get('/api/AutorizacaoDeExecucaoDoPlanoDoCurso/:planoDeCursoId/ValidarRegraPsg', testeController.validarRegraPSG);

// NivelDeFaixaSalarial
router.get('/api/NivelDeFaixaSalarial/:nivelFaixaId/ObterFaixas', nivelFaixaSalarialController.obterFaixasSalariais);

// FaixaSalarial
router.post('/api/FaixaSalarial/AtualizarFaixas', faixaSalarialController.atualizarFaixas);
router.get('/api/FaixaSalarial/:faixaId', faixaSalarialController.obterPorId);
router.get('/api/FaixaSalarial/ObterRegistrosHistorico/:faixaId', faixaSalarialController.obterHistorico);

// DiaLetivo
router.get('/api/DiaLetivo/ObterProfissionaisSubstituidos/:colaboradorId/:turmaUnidadeCurricularDoPlanoDoCursoId', profissionalDiaLetivoController.obterProfissionaisSubstituidos);

// ProfissionalDiasLetivos
router.post('/api/ProfissionalDiasLetivos', profissionalDiaLetivoController.salvar);

 // PrecificacaoDaTurma
router.post('/api/PrecificacaoDaTurma/CriarPrecificacoesDasMatriculas', precificacaoDaTurmaController.criarPrecificacoesDasMatriculas);

// ProfissionalDeEducacao
router.get('/api/ProfissionalDeEducacao/ObterDistratosEContratoRealizadosPorTratamentoDeVacancia', profissionalDeEducacaoController.obterDistratosEContratoRealizadosPorTratamentoDeVacancia);
router.post('/api/ProfissionalDeEducacao/GerarContratoETermo', profissionalDeEducacaoController.gerarContratoETermo);
router.post('/api/ProfissionalDeEducacao/emitir-convocacao', profissionalDeEducacaoController.emitirConvocacao);
router.post('/api/ProfissionalDeEducacao/emitir-distrato', profissionalDeEducacaoController.emitirDistrato);

// AlocacaoContratoDoColaboradorFaixaSalarial
router.put('/api/AlocacaoContratoDoColaboradorFaixaSalarial/AlterarFaixaSalarialProfissionalDiaLetivo', alocacaoContratoDoColaboradorFaixaSalarialController.alterarFaixaSalarialProfissionalDiaLetivo);

// Turma
router.post('/api/Turma', turmaController.salvar);

// Biblioteca BNWeb
router.get('/api/PortalAluno/biblioteca-digital/bnweb/acesso', bnwebController.obterTipoAcessoBnWeb);
router.get('/api/PortalAluno/biblioteca-digital/bnweb/cadastros', bnwebController.listarContas);
router.get('/api/bnweb/resumo-emprestimos', bnwebController.resumoEmprestimos);
router.post('/api/bnweb/alterar-permissao-emprestimos', bnwebController.alterarPermissaoEmprestimo);
router.get('/api/bnweb/detalhes-acesso', bnwebController.listarRegionais);
router.post('/api/bnweb/habilitar-conta', bnwebController.habilitarConta);

// Gestão do Aluno
router.post('/api/GestaoDoAluno/AlterarEstadoPorUC', gestaoAlunoController.alterarEstadoPorUC);

// Estado da Matricula RA
router.post('/api/EstadoDaMatriculaRA/AlterarEstadoDaMatriculaRA', estadoDaMatriculaRAController.alterarEstadoDaMatriculaRA);
router.post('/api/EstadoDaMatriculaRA/PermitirAlterarParaDesistente', estadoDaMatriculaRAController.permitirAlterarParaDesistente);
router.post('/api/EstadoDaMatriculaRA/PermitirAlterarParaEvadido', estadoDaMatriculaRAController.permitirAlterarParaEvadido);
router.post('/api/EstadoDaMatriculaRA/AlterarEstadoDaMatriculaRAParaTransferido', estadoDaMatriculaRAController.alterarEstadoDaMatriculaRAParaTransferido);
router.post('/api/EstadoDaMatriculaRA/AlterarEstadoDaMatriculaRAParaSaidaIntermediaria', estadoDaMatriculaRAController.alterarEstadoDaMatriculaRAParaMatriculaSaidaIntermediaria);

// Alunos da Turma
router.post('/api/AlunosDaTurma/AlterarResultadoFinal', alunosDaTurmaController.alterarResultadoFinal);
router.post('/api/AlunosDaTurma/PermitirAlterarResultadoFinal', alunosDaTurmaController.permitirAlterarResultadoFinal);

// Parametro do Regional
router.post('/api/ParametroDoRegional', parametroDoRegional.cadastrar);
router.get('/api/ParametroDoRegional/:parametroId', parametroDoRegional.obterPorId);

module.exports = router;

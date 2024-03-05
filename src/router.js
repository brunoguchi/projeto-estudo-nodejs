const express = require('express');
const testeController = require('./controllers/testeController');
const nivelFaixaSalarialController = require('./controllers/nivelFaixaSalarialController')
const faixaSalarialController = require('./controllers/faixaSalarialController')
const profissionalDiaLetivoController = require('./controllers/profissionalDiaLetivoController')
const precificacaoDaTurmaController = require('./controllers/precificacaoDaTurmaController')
const profissionalDeEducacaoController = require('./controllers/profissionalDeEducacaoController')
const alocacaoContratoDoColaboradorFaixaSalarialController = require('./controllers/alocacaoContratoDoColaboradorFaixaSalarialController')

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

module.exports = router;

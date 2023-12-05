const express = require('express');
const testeController = require('./controllers/testeController');
const nivelFaixaSalarialController = require('./controllers/nivelFaixaSalarialController')
const faixaSalarialController = require('./controllers/faixaSalarialController')
const profissionalDiaLetivoController = require('./controllers/profissionalDiaLetivoController')
const precificacaoDaTurmaController = require('./controllers/precificacaoDaTurmaController')

const router = express.Router();

router.get('/api/AssinaturaDeComboDeCurso/Combo/:comboId/FormasDePagamento', testeController.obterFormasDePagamento);
router.get('/api/AssinaturaDeComboDeCurso/Combo/:comboId/:pessoaId/:tipoPessoa/ValidarInadimplencia/', testeController.validarInadiplenciaDoResponsavel);
router.get('/api/AssinaturaDeComboDeCurso/Combo/GerarIdentificadorUnico/', testeController.gerarIdentificador);

router.post('/api/AssinaturaDeComboDeCurso/armazenar', testeController.armazenar);

router.get('/api/GestaoDeMateriais/', testeController.listarListasPadroesDeMateriais);

router.get('/api/AutorizacaoDeExecucaoDoPlanoDoCurso/:planoDeCursoId/ValidarRegraPsg', testeController.validarRegraPSG);

router.get('/api/NivelDeFaixaSalarial/:nivelFaixaId/ObterFaixas', nivelFaixaSalarialController.obterFaixasSalariais);

router.post('/api/FaixaSalarial/AtualizarFaixas', faixaSalarialController.atualizarFaixas);
router.get('/api/FaixaSalarial/:faixaId', faixaSalarialController.obterPorId);
router.get('/api/FaixaSalarial/ObterRegistrosHistorico/:faixaId', faixaSalarialController.obterHistorico);

router.get('/api/DiaLetivo/ObterProfissionaisSubstituidos/:colaboradorId/:turmaUnidadeCurricularDoPlanoDoCursoId',
    profissionalDiaLetivoController.obterProfissionaisSubstituidos);

router.post('/api/PrecificacaoDaTurma/CriarPrecificacoesDasMatriculas', precificacaoDaTurmaController.criarPrecificacoesDasMatriculas);

module.exports = router;

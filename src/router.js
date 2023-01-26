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
const documentosController = require('./controllers/documentosController')
const uappiController = require('./controllers/uappiController')
const simplusController = require('./controllers/simplusController')
const bluesoftController = require('./controllers/bluesoftController')
const iamController = require('./controllers/iamController')
const omniController = require('./controllers/omniBradescoController')
const anymarketFeatureFlagController = require('./controllers/anymarketFeatureFlag');
const alertsController = require('./controllers/alertsController');
const httpStatusController = require('./controllers/httpStatusController');
const lojaVlozController = require('./controllers/lojaVlozController');
const stoneController = require('./controllers/stoneController');

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
router.get('/api/documentos', documentosController.obterDocumentos);
router.get('/api/documentos/:id/download', documentosController.download);

// UAPPI (HUB)
router.post('/v1/auth', uappiController.obterToken);
router.get('/v1/ping', uappiController.ping);
router.put('/v1/products/stock-batch', uappiController.productsStockBatch);
router.put('/v1/products/price-batch', uappiController.productsPriceBatch);

// UAPPI (PLATAFORMA)
router.post('/v2/auth', uappiController.obterToken);
router.get('/v2/ping', uappiController.ping);
router.get('/v2/orders/:numeroPedido', uappiController.getOrder);

// SIMPLUS
router.get('/ping', simplusController.ping);
router.get('/product', simplusController.getProduct);
router.post('/jwt-login', simplusController.obterToken);

// BLUESOFT
router.get('/ping', bluesoftController.ping);
router.get('/products', bluesoftController.getProduct);

// CORE/IAM
router.get('/v1/companies', iamController.getCompanies);

// Bradesco Emulador Token
router.get('/jwt-login-bradesco', omniController.obterToken);
router.post('/jwt-signature-bradesco', omniController.obterBradSignatureHeader);
router.post('/auth/server/v1.1/token', omniController.mockedToken);
router.post('/v1/cbon/consulta-dados-portador/boletos-pagos', omniController.mockedObterBoletos);

// Anymarket
router.get('/featureflag/identifier/:identifier/key/:key', (req, res) => anymarketFeatureFlagController.getFeatureFlag(req, res, 'V2'));
router.get('/feature-flag/:identifier/key/:key', (req, res) => anymarketFeatureFlagController.getFeatureFlag(req, res, 'CORE'));

// Testes de request
router.get('/api/teste-get/:prop1/:prop2', alertsController.getWithParams);
router.post('/api/teste-post', alertsController.postWithParams);
router.post('/api/Worker/ConcluirCadastroClienteAdquirente', alertsController.postWithParams);

// Http Status
router.post('/http-status/:statusCode', (req, res) => httpStatusController.getByHttpStatus(req, res, parseInt(req.params.statusCode, 10)));

// LOJA VLOZ
router.get('/identity/v1/ExtratoVLoz', lojaVlozController.getCnpjs);

// STONE
router.post('/api/stone/resolve-challenge', stoneController.resolverChallenge);
router.post('/auth/challenge', stoneController.obterTokenChallenge);
router.get('/stone-accounts', stoneController.obterClienteStone);
router.post('/stone-accounts', stoneController.cadastrarClienteStone);
router.get('/affiliates/mcc', stoneController.obterMccs);
router.get('/pricing/offers', stoneController.obterOfertas);
router.post('/affiliates', stoneController.cadastrarAfiliados);
router.get('/affiliates/details', stoneController.obterDetalhesAfiliados);
router.post('/logistics/service-orders/install-terminal', stoneController.cadastrarTerminal);
router.get('/logistics/service-orders', stoneController.obterOrdensServico);

module.exports = router;

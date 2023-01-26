const express = require('express');
const testeController = require('./controllers/testeController');

const router = express.Router();

router.get('/api/AssinaturaDeComboDeCurso/Combo/:comboId/FormasDePagamento', testeController.obterFormasDePagamento);
router.get('/api/AssinaturaDeComboDeCurso/Combo/:comboId/:pessoaId/:tipoPessoa/ValidarInadimplencia/', testeController.validarInadiplenciaDoResponsavel);
router.get('/api/AssinaturaDeComboDeCurso/Combo/GerarIdentificadorUnico/', testeController.gerarIdentificador);

module.exports = router;
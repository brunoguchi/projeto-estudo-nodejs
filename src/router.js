const express = require('express');
const testeController = require('./controllers/testeController');

const router = express.Router();

router.get('/api/AssinaturaDeComboDeCurso/Combo/:comboId/FormasDePagamento', testeController.obterFormasDePagamento);
router.get('/api/AssinaturaDeComboDeCurso/validarInadiplencia/:numeroDocumentoResponsavel', testeController.validarInadiplenciaDoResponsavel);

module.exports = router;
const crypto = require('crypto-js/sha256');

const obterFormasDePagamento = (request, response) => {
  const { comboId } = request.params;

  return response.status(200).json([
    {
      id: 2,
      formaDePagamento: 'A VISTA',
      meioDePagamento: 'BOLETO BANCÁRIO',
      parcelas: [
        {
          numeroDeParcelas: 1,
          valorDaParcela: 199.8,
        },
      ],
    },
    {
      id: 4,
      formaDePagamento: 'A VISTA OU PARCELADO',
      meioDePagamento: 'CARTÃO DE CRÉDITO',
      parcelas: [
        {
          numeroDeParcelas: 1,
          valorDaParcela: 199.8,
        },
        {
          numeroDeParcelas: 2,
          valorDaParcela: 99.9,
        },
        {
          numeroDeParcelas: 3,
          valorDaParcela: 66.6,
        },
      ],
    },
    {
      id: 9,
      formaDePagamento: 'PAGAMENTO RECORRENTE',
      meioDePagamento: 'CARTÃO DE CRÉDITO',
      parcelas: [
        {
          numeroDeParcelas: 1,
          valorDaParcela: 199.8,
        },
        {
          numeroDeParcelas: 2,
          valorDaParcela: 99.9,
        },
      ],
    },
  ]);
};

const validarInadiplenciaDoResponsavel = (request, response) => {
  return response.status(200).send(false);
};

const gerarIdentificador = (request, response) => {
  const { comboId, pessoaId, dataHora, colaboradorId } = request.query;
  // const { comboId, pessoaId, dataHora, colaboradorId } = request.params;
  // const { comboId, pessoaId, dataHora, colaboradorId } = request.body;

  const hash = crypto(comboId + pessoaId + dataHora + colaboradorId);

  return response.status(200).json(hash.toString());
};

module.exports = {
  obterFormasDePagamento,
  validarInadiplenciaDoResponsavel,
  gerarIdentificador,
};

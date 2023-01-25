const obterFormasDePagamento = (request, response) => {
  return response.status(200).json([
    {
      id: 2,
      formaDePagamentoId: 2,
      meioDePagamento: 'A VISTA',
      formaDePagamento: 'BOLETO BANCÁRIO',
      parcelas: [
        {
          numeroParcela: 1,
          valor: 199.8,
        },
      ],
    },
    {
      id: 2,
      formaDePagamentoId: 4,
      meioDePagamento: 'A VISTA OU PARCELADO',
      formaDePagamento: 'CARTÃO DE CRÉDITO',
      parcelas: [
        {
          numeroParcela: 1,
          valor: 199.8,
        },
        {
          numeroParcela: 2,
          valor: 99.9,
        },
        {
          numeroParcela: 3,
          valor: 66.6,
        },
      ],
    },
    {
      id: 2,
      formaDePagamentoId: 9,
      meioDePagamento: 'PAGAMENTO RECORRENTE',
      formaDePagamento: 'CARTÃO DE CRÉDITO',
      parcelas: [
        {
          numeroParcela: 1,
          valor: 199.8,
        },
        {
          numeroParcela: 2,
          valor: 99.9,
        },
      ],
    },
  ]);
};

const validarInadiplenciaDoResponsavel = (request, response) => {
  return response.status(200).send(false);
};

module.exports = {
  obterFormasDePagamento,
  validarInadiplenciaDoResponsavel,
};

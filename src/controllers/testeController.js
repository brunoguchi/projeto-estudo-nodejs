const crypto = require('crypto-js/sha256');

const obterFormasDePagamento =
  (
    request,
    response
  ) => {
    const {
      comboId,
    } =
      request.params;

    return response
      .status(
        200
      )
      .json(
        [
          {
            id: 2,
            formaDePagamento:
              'A VISTA',
            meioDePagamento:
              'BOLETO BANCÁRIO',
            parcelas:
              [
                {
                  numeroDeParcelas: 1,
                  valorDaParcela: 199.8,
                },
              ],
          },
          {
            id: 4,
            formaDePagamento:
              'A VISTA OU PARCELADO',
            meioDePagamento:
              'CARTÃO DE CRÉDITO',
            parcelas:
              [
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
            formaDePagamento:
              'PAGAMENTO RECORRENTE',
            meioDePagamento:
              'CARTÃO DE CRÉDITO',
            parcelas:
              [
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
        ]
      );
  };

const validarInadiplenciaDoResponsavel =
  (
    request,
    response
  ) => {
    return response
      .status(
        200
      )
      .send(
        false
      );
  };

const gerarIdentificador =
  (
    request,
    response
  ) => {
    const {
      comboId,
      pessoaId,
      dataHora,
      colaboradorId,
    } =
      request.query;
    // const { comboId, pessoaId, dataHora, colaboradorId } = request.params;
    // const { comboId, pessoaId, dataHora, colaboradorId } = request.body;

    const hash =
      crypto(
        comboId +
          pessoaId +
          dataHora +
          colaboradorId
      );

    return response
      .status(
        200
      )
      .json(
        hash.toString()
      );
  };

const armazenar =
  (
    request,
    response
  ) => {
    setTimeout(
      () => {
        //return response.status(400).json({ error: 'deu bom não' });
        return response
          .status(
            200
          )
          .json(
            true
          );
      },
      2000
    );
  };

const listarListasPadroesDeMateriais =
  (
    request,
    response
  ) => {
    return response
      .status(
        200
      )
      .json(
        {
          lista:
            [
              {
                id: 1,
                nomeDoPacote:
                  'Lista padrão de culinária italiana',
                nomeDoCurso:
                  'Técnicas Culinárias - Massas e Molhos',
                tipoDeMaterialDescricao:
                  'Ficha Técnica',
                quantidadeDeItens: 15,
                situacao: true,
              },
              {
                id: 2,
                nomeDoPacote:
                  'Lista padrão de culinária japonesa',
                nomeDoCurso:
                  'Técnicas Culinárias - Nigiris e Hosomakis',
                tipoDeMaterialDescricao:
                  'Material Pedagógico',
                quantidadeDeItens: 8,
                situacao: false,
              },
            ],
          total: 2,
        }
      );
  };

const validarRegraPSG =
  (
    request,
    response
  ) => {
    const { planoDeCursoId } = request.params;

    setTimeout(
      () => {
        return response.status(400).json({ error: ['Tipo de Ação e CH Mínima do Plano do Curso não permitida para o Recurso Financeiro PSG. Por favor, verifique a Autorização de Execução.'] });
        // return response.status(200).json(true);
      },
      2000
    );
  };

module.exports =
  {
    obterFormasDePagamento,
    validarInadiplenciaDoResponsavel,
    gerarIdentificador,
    armazenar,
    listarListasPadroesDeMateriais,
    validarRegraPSG
  };

const { execSync } = require('child_process');
const path = require('path');
const { privateDecrypt } = require("crypto");
const { readFileSync } = require("fs");
const forge = require("node-forge");

const gerarToken = (request, response) => {
  try {
    const { challenge } = request.body;

    if (!challenge) {
      return response.status(400).json({
        error: "Challenge é obrigatório",
        message: "Envie o challenge no body da requisição"
      });
    }

    const scriptPath = path.join(__dirname, '../services/stone-integration/GeraToken.js');

    try {
      const output = execSync(`node "${scriptPath}" ${challenge}`, { encoding: 'utf8' });
      const token = output.trim();

      return response.status(200).json({
        token: token,
        challenge: challenge,
        message: "Challenge decriptografado com sucesso"
      });
    } catch (error) {
      return response.status(500).json({
        error: error.message,
        message: "Erro ao gerar token"
      });
    }

  } catch (error) {
    return response.status(500).json({
      error: error.message,
      message: "Erro ao gerar token"
    });
  }
};

const resolverChallenge = (request, response) => {
  try {
    console.log(request);
    const { challenge } = request.body;

    if (!challenge) {
      return response.status(400).json({
        error: "Challenge é obrigatório",
        message: "Envie o challenge no body da requisição"
      });
    }

    try {
      const pfxPath = "C:\\temp\\cert\\integrador-stone.pfx";
      const pfxBuffer = readFileSync(pfxPath);
      const passphrase = "Stone12345@";
      const pfxAsn1 = forge.asn1.fromDer(pfxBuffer.toString("binary"));
      const pfx = forge.pkcs12.pkcs12FromAsn1(pfxAsn1, passphrase);

      const keyBag = pfx.getBags({
        bagType: forge.pki.oids.pkcs8ShroudedKeyBag
      })[forge.pki.oids.pkcs8ShroudedKeyBag][0];
      const PRIVATE_KEY = forge.pki.privateKeyToPem(keyBag.key);

      const result = privateDecrypt(
        {
          key: PRIVATE_KEY,
          passphrase,
        },
        Buffer.from(challenge, "hex")
      ).toString();

      return response.status(200).json({
        token: result,
        challenge: challenge,
        message: "Challenge decriptografado com sucesso"
      });
    } catch (error) {
      return response.status(500).json({
        error: error.message,
        message: "Erro ao gerar token"
      });
    }

  } catch (error) {
    return response.status(500).json({
      error: error.message,
      message: "Erro ao gerar token"
    });
  }
};

const obterTokenChallenge = (request, response) => {

  const jsonResponse = {
    "success": true,
    "data": "99c2d226146552eaa9efc1a3e1adff84327e2fd2c54dd5eda676444dc7526ea8fa3f9118d96fa47e9e553eae6d35feccd0dd84869699f054b570a569d723770470258706c7b909557e647369369d5a0cb7c5fcac763130d49a30288b5416fee3bf2d2263afdf63beeab23858bfa31b69d4586b7f08665932d864b04933710cfc14bbdb696f3bed8fb2353583b8f6d0c0a9f287e595f56097154987dbc2e610fdfff8fb6b35d65f7655b916ab2dc600de366c75c4137dcdc42fcd046057f332483379dcee0ca3c243d6330dca7138ee6c854523cbcda7cedf34b63a1d52e75bb57589fa007df5850981044439c44d0013e9e1c375d93a2ce63b56fa9c64d931fb"
  };

  //return response.status(400).json(['deu grosópi']);
  return response.status(200).json(jsonResponse);
};

const obterClienteStone = (request, response) => {
  // var jsonResponse = {
  //   "success": true,
  //   "data": {
  //     "account": "52351182",
  //     "message": "Conta existente"
  //   }
  // }

  var jsonResponse = {
    "success": true,
    "data": {
      "message": "Conta não existente"
    }
  }

  return response.status(200).json(jsonResponse);
}

const cadastrarClienteStone = (request, response) => {
  var jsonResponse = {
    "success": true,
    "data": {
      "_id": "69542de30915815a2d675bd5",
      "created_at": "2025-12-30T19:54:11.865Z",
      "updated_at": "2026-01-07T12:57:42.883Z",
      "account_type": 1,
      "partner": {
        "id": 706,
        "name": "VOTORANTIM CIMENTOS"
      },
      "sales_team_member": {
        "id": null,
        "name": null
      },
      "document": "53804395000141",
      "trade_name": "Nome Fantasia da empresa",
      "company_name": "Razão Social da empresa",
      "merchant_responsible_document": "82253661074",
      "merchant_responsible_name": "Nome completo do responsável",
      "email": "ext.edson.rodrigues@vcimentos.com",
      "account": "99999999",
      "accountId": "adf07c84-9c68-4ca9-bc37-21bc5a38a95a",
      "user": {
        "status": {
          "id": 60,
          "status": "approved",
          "description": "Cadastro aprovado"
        },
        "migrated": true
      },
      "org": {
        "status": {
          "id": 60,
          "status": "approved",
          "description": "Cadastro aprovado"
        }
      },
      "pixKeys": [
        {
          "account_id": "c5aa271c-0ab5-48f9-9bfb-b859e803958c",
          "type": "random_key",
          "status": "key_created",
          "createdAt": "2020-10-16T20:52:50+00:00",
          "ownershipDateAt": "2020-10-16T20:52:50+00:00",
          "statusChangedAt": "2020-10-16T20:52:50+00:00"
        }
      ],
      "lead": 1
    }
  };

  //return response.status(400).json(['deu grosópi']);
  return response.status(200).json(jsonResponse);
}

const obterMccs = (request, response) => {
  const jsonResponse = {
    "success": true,
    "data": {
      "mccs": [
        {
          "code": 4214
        },
        {
          "code": 5213
        },
        {
          "code": 5212
        },
        {
          "code": 5211
        }
      ]
    }
  }

  //return response.status(400).json(['deu grosópi']);
  return response.status(200).json(jsonResponse);
}

const obterOfertas = (request, response) => {
  const jsonResponse = {
    "success": true,
    "data": {
      "offers": [
        {
          "id": "0885c543-25da-4f5f-8191-7d2f7cf8b6c9",
          "name": "Plano 15%",
          "conditions": {
            "promotion": false,
            "campaign": false,
            "prepayment_d0": false,
            "stone_account": false,
            "prepayment_automatic": true,
            "volume_exemption": false,
            "prepayment_d1": false,
            "promotion_free_trial": true,
            "daily_payment_type": null,
            "daily_payment": false
          },
          "promotion_details": {},
          "prepayments_fees": {
            "automatic": 1.8800000000000001,
            "spot": 2.48,
            "d0": 0.5,
            "d1": 0.3
          },
          "volume_exemption_condition": null,
          "mdr": {
            "visa": {
              "credit": 2.4299999999999997,
              "credit2to6": 3.1399999999999997,
              "credit7to12": 3.47,
              "debit": 1.66
            },
            "master": {
              "credit": 2.4299999999999997,
              "credit2to6": 3.1399999999999997,
              "credit7to12": 3.47,
              "debit": 1.66
            },
            "elo": {
              "credit": 2.4299999999999997,
              "credit2to6": 3.1399999999999997,
              "credit7to12": 3.47,
              "debit": 1.66
            },
            "hiper": {
              "credit": 2.4299999999999997,
              "credit2to6": 3.1399999999999997,
              "credit7to12": 3.47,
              "debit": null
            },
            "amex": {
              "credit": 2.4299999999999997,
              "credit2to6": 3.1399999999999997,
              "credit7to12": 3.47,
              "debit": null
            }
          },
          "total_effective_cost": null,
          "mdr_for_daily_payment": null,
          "terminals": [
            {
              "type": "pos",
              "value": 838.8,
              "firstValue": 838.8,
              "technology": "Android",
              "exemption": {
                "periodType": "days",
                "value": 0,
                "period": "Dias"
              },
              "quantity": {
                "min": 1,
                "max": 20
              }
            },
            {
              "type": "pos",
              "value": 478.8,
              "firstValue": 478.8,
              "technology": "Mamba",
              "exemption": {
                "periodType": "days",
                "value": 0,
                "period": "Dias"
              },
              "quantity": {
                "min": 1,
                "max": 20
              }
            }
          ],
          "pix": {
            "fee": 0.75,
            "type": "percentual",
            "allow_change_fee": true
          }
        },
        {
          "id": "0a6f5e2b-3f4c-4d2e-9f7b-1c2d3e4f5a6b",
          "name": "Plano 20%",
          "conditions": {
            "promotion": false,
            "campaign": false,
            "prepayment_d0": false,
            "stone_account": false,
            "prepayment_automatic": true,
            "volume_exemption": false,
            "prepayment_d1": false,
            "promotion_free_trial": true,
            "daily_payment_type": null,
            "daily_payment": false
          },
          "promotion_details": {},
          "prepayments_fees": {
            "automatic": 1.8800000000000001,
            "spot": 2.48,
            "d0": 0.5,
            "d1": 0.3
          },
          "volume_exemption_condition": null,
          "mdr": {
            "visa": {
              "credit": 2.5100000000000002,
              "credit2to6": 3.19,
              "credit7to12": 3.55,
              "debit": 1.66
            },
            "master": {
              "credit": 2.5100000000000002,
              "credit2to6": 3.19,
              "credit7to12": 3.55,
              "debit": 1.66
            },
            "elo": {
              "credit": 2.5100000000000002,
              "credit2to6": 3.19,
              "credit7to12": 3.55,
              "debit": 1.66
            },
            "hiper": {
              "credit": 2.5100000000000002,
              "credit2to6": 3.19,
              "credit7to12": 3.55,
              "debit": null
            },
            "amex": {
              "credit": 2.5100000000000002,
              "credit2to6": 3.19,
              "credit7to12": 3.55,
              "debit": null
            }
          },
          "total_effective_cost": null,
          "mdr_for_daily_payment": null,
          "terminals": [
            {
              "type": "pos",
              "value": 359.1,
              "firstValue": 478.8,
              "technology": "Android",
              "exemption": {
                "periodType": "days",
                "value": 0,
                "period": "Dias"
              },
              "quantity": {
                "min": 1,
                "max": 20
              }
            },
            {
              "type": "pos",
              "value": 359.1,
              "firstValue": 478.8,
              "technology": "Mamba",
              "exemption": {
                "periodType": "days",
                "value": 0,
                "period": "Dias"
              },
              "quantity": {
                "min": 1,
                "max": 20
              }
            }
          ],
          "pix": {
            "fee": 0.75,
            "type": "percentual",
            "allow_change_fee": true
          }
        }
      ]
    }
  }

  //return response.status(400).json(['deu grosópi']);
  return response.status(200).json(jsonResponse);
}

const cadastrarAfiliados = (request, response) => {
  var jsonResponse = {
    "success": true,
    "data": {
      "message": "Accreditation completed successfully",
      "stonecode": "999999999"
    }
  }

  //return response.status(400).json(['deu grosópi']);
  return response.status(200).json(jsonResponse);
}

const obterDetalhesAfiliados = (request, response) => {
  var jsonResponse = {
    "success": true,
    "data": {
      "mode": "aluguel",
      "stonecode": "582286941",
      "document": "48684123000115",
      "trade_name": "Padaria Sabor Fictício",
      "status": "Aprovado - Pronto para transacionar",
      "credentiation_date": "2026-01-15T20:23:26.929Z",
      "volume_exemption": {
        "status": false
      },
      "pix": {
        "status": true,
        "fee": 1.6538985696429505
      },
      "sales_member": {},
      "contact_data": {
        "type": 1,
        "email": "joao.silva@emailficticio.com.br",
        "mobile_phone": "21999998888"
      },
      "address_data": {
        "zip": "20040002",
        "state": "RJ",
        "city": "Rio de Janeiro",
        "street": "Avenida Rio Branco",
        "street_number": "156",
        "complement": "Loja A"
      },
      "bank_data": {
        "bank_code": "197",
        "bank_name": "Stone Pagamentos S.A.",
        "bank_branch": "0001",
        "bank_digit": "-",
        "account_number": "7993247",
        "account_digit": "1",
        "account_type_id": "1"
      },
      "commercial_conditions": {
        "monthly_priced_tpv": 0,
        "mcc": 4214,
        "rav": 3.05,
        "mdr": [
          {
            "transaction_type": "Credito a vista",
            "rate": 3.1,
            "card_brand": "Visa"
          },
          {
            "transaction_type": "Credito a vista",
            "rate": 3.1,
            "card_brand": "MasterCard"
          },
          {
            "transaction_type": "Credito a vista",
            "rate": 3.28,
            "card_brand": "American Express"
          },
          {
            "transaction_type": "Credito a vista",
            "rate": 3.55,
            "card_brand": "Elo"
          },
          {
            "transaction_type": "Credito de 2 a 6 parcelas s/ juros",
            "rate": 3.45,
            "card_brand": "Visa"
          },
          {
            "transaction_type": "Credito de 2 a 6 parcelas s/ juros",
            "rate": 3.45,
            "card_brand": "MasterCard"
          },
          {
            "transaction_type": "Credito de 2 a 6 parcelas s/ juros",
            "rate": 3.52,
            "card_brand": "American Express"
          },
          {
            "transaction_type": "Credito de 2 a 6 parcelas s/ juros",
            "rate": 3.94,
            "card_brand": "Elo"
          },
          {
            "transaction_type": "Credito de  7 a 12 parcelas s/ juros",
            "rate": 3.75,
            "card_brand": "Visa"
          },
          {
            "transaction_type": "Credito de  7 a 12 parcelas s/ juros",
            "rate": 3.75,
            "card_brand": "MasterCard"
          },
          {
            "transaction_type": "Credito de  7 a 12 parcelas s/ juros",
            "rate": 3.55,
            "card_brand": "American Express"
          },
          {
            "transaction_type": "Credito de  7 a 12 parcelas s/ juros",
            "rate": 4.45,
            "card_brand": "Elo"
          },
          {
            "transaction_type": "Credito com parcelas c/ juros",
            "rate": 0,
            "card_brand": "Visa"
          },
          {
            "transaction_type": "Credito com parcelas c/ juros",
            "rate": 0,
            "card_brand": "MasterCard"
          },
          {
            "transaction_type": "Credito com parcelas c/ juros",
            "rate": 0,
            "card_brand": "American Express"
          },
          {
            "transaction_type": "Credito com parcelas c/ juros",
            "rate": 0,
            "card_brand": "Elo"
          },
          {
            "transaction_type": "Debito a vista",
            "rate": 2.14,
            "card_brand": "Visa"
          },
          {
            "transaction_type": "Debito a vista",
            "rate": 2.14,
            "card_brand": "MasterCard"
          },
          {
            "transaction_type": "Debito a vista",
            "rate": 0,
            "card_brand": "American Express"
          },
          {
            "transaction_type": "Debito a vista",
            "rate": 2.37,
            "card_brand": "Elo"
          },
          {
            "transaction_type": "Credito de  13 a 18 parcelas s/ juros",
            "rate": 5.5,
            "card_brand": "Visa"
          },
          {
            "transaction_type": "Credito de  13 a 18 parcelas s/ juros",
            "rate": 5.5,
            "card_brand": "MasterCard"
          },
          {
            "transaction_type": "Credito de  13 a 18 parcelas s/ juros",
            "rate": 5.5,
            "card_brand": "Elo"
          }
        ]
      }
    },
    "metadata": {
      "total_items": 1,
      "total_pages": 1,
      "page": 1,
      "size": 1
    }
  }

  //return response.status(400).json(['deu grosópi']);
  return response.status(200).json(jsonResponse);
}

const cadastrarTerminal = (request, response) => {
  var jsonResponse = {
    "success": true,
    "data": {
      "service_order_numbers_list": [
        "999999999"
      ]
    }
  }

  //return response.status(400).json(['deu grosópi']);
  return response.status(200).json(jsonResponse);
}

const obterOrdensServico = (request, response) => {
  var jsonResponse = {
    "success": true,
    "data": [
      {
        "service_order_number": "199826",
        "status": "cancelled",
        "stonecode": "272440958",
        "service_type": "UNINSTALLATION",
        "terminal_device_id": "4567",
        "terminal_device_model": "VX 685 GPRS",
        "terminal_device_serial_number": "523-697-233",
        "opening_date": "2021-09-15T21:12:56",
        "arrival_date": "2021-09-22T15:25:43",
        "deadline_date": "2021-09-16T22:00:00"
      },
      {
        "service_order_number": "199818",
        "status": "open",
        "stonecode": "272440958",
        "service_type": "INSTALLATION",
        "terminal_device_id": "5678",
        "terminal_device_model": null,
        "terminal_device_serial_number": null,
        "opening_date": "2021-09-15T15:37:49",
        "arrival_date": null,
        "deadline_date": "2021-09-16T22:00:00"
      },
      {
        "service_order_number": "199817",
        "status": "open",
        "stonecode": "272440958",
        "service_type": "REPLACEMENT",
        "terminal_device_id": "1234",
        "terminal_device_model": "VX 690",
        "terminal_device_serial_number": "321-438-107",
        "opening_date": "2021-09-15T15:37:06",
        "arrival_date": null,
        "deadline_date": "2021-09-16T22:00:00"
      }
    ],
    "metadata": {
      "page": 1,
      "size": 3,
      "total_items": 3,
      "total_pages": 1
    }
  }

  return response.status(200).json(jsonResponse);
}

module.exports = {
  gerarToken,
  resolverChallenge,
  obterTokenChallenge,
  obterClienteStone,
  cadastrarClienteStone,
  obterMccs,
  obterOfertas,
  cadastrarAfiliados,
  obterDetalhesAfiliados,
  cadastrarTerminal,
  obterOrdensServico
};

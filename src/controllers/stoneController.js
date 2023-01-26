const { execSync } = require('child_process');
const path = require('path');
const { privateDecrypt } = require("crypto");
const { readFileSync, readFile } = require("fs");
const forge = require("node-forge");
const https = require('https');
const http = require('http');
const jwt = require('jsonwebtoken');

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

const resolverChallengeComPEM = (request, response) => {
  try {
    const { challenge, codigoEmpresa } = request.body;

    if (!challenge) {
      return response.status(400).json({
        error: "Challenge é obrigatório",
        message: "Envie o challenge no body da requisição"
      });
    }

    if (!codigoEmpresa) {
      return response.status(400).json({
        error: "Código da empresa é obrigatório",
        message: "Envie o codigoEmpresa no body da requisição"
      });
    }

    const pemFiles = {
      '706': 'C:\\temp\\cert\\private-key-706.pem',
      '748': 'C:\\temp\\cert\\private-key-748.pem',
      '9534': 'C:\\temp\\cert\\private-key-9534.pem',
      '9753': 'C:\\temp\\cert\\private-key-9753.pem'
    };

    const pemPath = pemFiles[codigoEmpresa];

    if (!pemPath) {
      return response.status(400).json({
        error: "Código de empresa inválido",
        message: "Códigos válidos: 706, 748, 9534, 9753"
      });
    }

    try {
      const privateKey = readFileSync(pemPath, 'utf8');

      const result = privateDecrypt(
        {
          key: privateKey,
        },
        Buffer.from(challenge, "hex")
      ).toString();

      return response.status(200).json({
        token: result,
        challenge: challenge,
        codigoEmpresa: codigoEmpresa,
        message: "Challenge decriptografado com sucesso"
      });
    } catch (error) {
      return response.status(500).json({
        error: error.message,
        message: "Erro ao descriptografar challenge"
      });
    }

  } catch (error) {
    return response.status(500).json({
      error: error.message,
      message: "Erro ao processar requisição"
    });
  }
};

const obterTokenChallenge = (request, response) => {
  const { client_id } = request.body;

  const jsonResponse_706 = {
    "success": true,
    "data": "99c2d226146552eaa9efc1a3e1adff84327e2fd2c54dd5eda676444dc7526ea8fa3f9118d96fa47e9e553eae6d35feccd0dd84869699f054b570a569d723770470258706c7b909557e647369369d5a0cb7c5fcac763130d49a30288b5416fee3bf2d2263afdf63beeab23858bfa31b69d4586b7f08665932d864b04933710cfc14bbdb696f3bed8fb2353583b8f6d0c0a9f287e595f56097154987dbc2e610fdfff8fb6b35d65f7655b916ab2dc600de366c75c4137dcdc42fcd046057f332483379dcee0ca3c243d6330dca7138ee6c854523cbcda7cedf34b63a1d52e75bb57589fa007df5850981044439c44d0013e9e1c375d93a2ce63b56fa9c64d931fb"
  };

  const jsonResponse_748 = {
    "success": true,
    "data": "3d4e975216e23e53926d337ae5c92f3ba5f76f2293afa4283b7c0fd03797559fc9cf51915b37ed56a66bbd37ca400cae118851ffb927408686a7d7fd2b4406b8d28a6318a09a1e076c16202b947881fcc8dba7ed368f14885d8befd1d06598407ea64f02c5dc992d42114b45b6d716bc824dcef9c36b446687ab73f9ed0c0264867b7d260c30503147849522b2d2bf0cd93c10088d4ab2caa3c181d9d4618240df08d47a53dc5f0442ae75556a2b153248eb874f0959252abdd33c2a0c3f4ba1a30293d211c04f752850487f0d100f55b6982d82307716c79935b442834211223e82106e44d7a08e7cd0a28ce3a34719ea537006ebfa11306ae2d0f3b18fb44a"
  };


  if (client_id === 'b01b0da4-a682-486d-9736-018a2e27697c') {
    return response.status(200).json(jsonResponse_706);
  } else if (client_id === 'ec659f7e-147d-41c2-9338-5068ae0f4568') {
    return response.status(200).json(jsonResponse_748);
  } else {
    return response.status(400).json({
      error: "Código de empresa inválido",
      message: "Códigos válidos: b01b0da4-a682-486d-9736-018a2e27697c, ec659f7e-147d-41c2-9338-5068ae0f4568"
    });
  }
};

const obterClienteStone = (request, response) => {
  var jsonResponse = {
    "success": true,
    "data": {
      "account": "52351182",
      "message": "Conta existente"
    }
  }

  // var jsonResponse = {
  //   "success": true,
  //   "data": {
  //     "message": "Conta não existente"
  //   }
  // }

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
          "id": "bbda4c4c-2676-40e0-a164-8a9dc3b8e837",
          "name": "Plano 15%"
        },
        {
          "id": "6efa0d4e-0639-4596-b4fc-c3bcbd8c4a30",
          "name": "Plano 20%"
        },
        {
          "id": "a506060b-c6a2-4a38-9f32-887e226bc54b",
          "name": "Plano 30%"
        },
        {
          "id": "f3b0e564-eece-48ac-8060-f693cdcd8dee",
          "name": "Plano 40%"
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
    "data": [{
      "mode": "aluguel",
      "stonecode": "999999999",
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
    }],
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

const cadastrarTerminal = async (request, response) => {
  //await new Promise(resolve => setTimeout(resolve, 35000));

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
        "service_order_number": "999999999",
        "status": "delivered",
        "stonecode": "272440958",
        "service_type": "UNINSTALLATION",
        "terminal_device_id": "4567",
        "terminal_device_model": "VX 685 GPRS",
        "terminal_device_serial_number": "523-697-233",
        "opening_date": "2021-09-15T21:12:56",
        "arrival_date": "2021-09-22T15:25:43",
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

const obterArquivoConciliacaoXml = (request, response) => {
  try {
    const { cnpj } = request.params;
    console.log('Header Authorization:', request.headers['authorization']);

    // if (cnpj !== '67890123000155') {
    //   return response.status(400).json("deu bom não");
    // }

    const filePath = 'C:\\temp\\stone\\stone-conciliacao.xml';
    //const filePath = 'C:\\temp\\stone\\arquivo-transacional-cliente-67890123000155.xml';
    //const filePath = 'C:\\Users\\bruno.noguchi\\Downloads\\exemplo-arquivo-transacional-stone.xml';

    readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return response.status(500).json({
          message: 'Erro ao ler o arquivo XML'
        });
      }

      response.setHeader('Content-Type', 'application/xml');
      return response.status(200).send(data);
    });

  } catch (error) {
    return response.status(500).json({
      message: 'Erro interno',
      error: error.message
    });
  }
};

const pedidoConsentimentoConciliacao = (request, response) => {
  try {
    // Normaliza as chaves do body para lowercase
    const normalizedBody = {};

    Object.keys(request.body).forEach(key => {
      normalizedBody[key.toLowerCase()] = request.body[key];
    });

    const webhookUrl = normalizedBody.webhookurl;
    const document = normalizedBody.document;

    // console.log('Body original:', request.body);
    // console.log('Body normalizado:', normalizedBody);

    if (!webhookUrl) {
      return response.status(400).json({
        error: "webhookUrl é obrigatória",
        message: "Envie a webhookUrl no body da requisição"
      });
    }

    const consentId = "68e94d9dc2c9845022d07911";
    const status = "pending";
    const tempoEsperaWebhook = 3000; // 3 segundos

    const jsonResponse = {
      "status": status,
      "consentId": consentId
    };

    response.status(200).json(jsonResponse);

    // Simula o processamento assíncrono do consentimento
    setTimeout(() => {
      const webhookPayload = {
        "username": "partner_conciliation_0d21ecbeaf2142019978ebbad1672538",
        "password": "U1BUKETnB788R8+FUYkyYQ==",
        "consent_id": consentId,
        "status": "accepted",
        "document": document || "22345678901235",
        "consent_user_id": "example@test.com",
        "created_at": new Date().toISOString(),
        "updated_at": new Date().toISOString(),
        "accepted_at": new Date().toISOString()
      };

      enviarWebhook(webhookUrl, webhookPayload);
    }, tempoEsperaWebhook);

  } catch (error) {
    return response.status(500).json({
      error: error.message,
      message: "Erro ao processar pedido de consentimento"
    });
  }
};

const enviarWebhook = (webhookUrl, payload) => {
  try {
    const url = new URL(webhookUrl);
    const isHttps = url.protocol === 'https:';
    const httpModule = isHttps ? https : http;

    const payloadString = JSON.stringify(payload);

    const options = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payloadString)
      }
    };

    const req = httpModule.request(options, (res) => {
      console.log(`Webhook enviado para ${webhookUrl} - Status: ${res.statusCode} - Timestamp: ${new Date().toISOString()}`);

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log('Resposta da webhook:', data);
      });
    });

    req.on('error', (error) => {
      console.error('Erro ao enviar webhook:', error.message);
    });

    req.write(payloadString);
    req.end();

  } catch (error) {
    console.error('Erro ao processar webhook:', error.message);
  }
};

const receberWebhookConciliacao = (request, response) => {
  try {
    const webhookData = request.body;

    console.log('=== WEBHOOK RECEBIDO ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Dados recebidos:', JSON.stringify(webhookData, null, 2));
    console.log('========================');

    if (!webhookData.consent_id || !webhookData.status) {
      return response.status(400).json({
        error: "Dados inválidos",
        message: "consent_id e status são obrigatórios"
      });
    }

    return response.status(200).json({
      message: "Webhook recebido com sucesso",
      received_consent_id: webhookData.consent_id,
      received_status: webhookData.status
    });

  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return response.status(500).json({
      error: error.message,
      message: "Erro ao processar webhook"
    });
  }
};

const obterTokenConciliacao = async (request, response) => {
  const { username, password, grant_type, client_id, client_secret } = request.body;
  console.log('username:', username);
  console.log('password:', password);
  console.log('grant_type:', grant_type);
  console.log('client_id:', client_id);
  console.log('client_secret:', client_secret);

  const data = {
    userId: 123456,
    username: 'bruno.noguchi'
  };

  const token = jwt.sign(data, 'suaChaveSecreta', { algorithm: 'HS256' });

  var jsonResponse = {
    "id_token": token,
    "expires_in": 86400,
    "token_type": "Bearer"
  }

  // var jsonResponse = {
  //   "message": "deu grosópi no token",
  //   "errors": [
  //     {
  //       "field": "<username>",
  //       "reason": "<reason>"
  //     }
  //   ]
  // }

  //return response.status(400).json(['deu grosópi']);
  return response.status(200).json(jsonResponse);
}

module.exports = {
  gerarToken,
  resolverChallenge,
  resolverChallengeComPEM,
  obterTokenChallenge,
  obterClienteStone,
  cadastrarClienteStone,
  obterMccs,
  obterOfertas,
  cadastrarAfiliados,
  obterDetalhesAfiliados,
  cadastrarTerminal,
  obterOrdensServico,
  obterArquivoConciliacaoXml,
  pedidoConsentimentoConciliacao,
  receberWebhookConciliacao,
  obterTokenConciliacao
};

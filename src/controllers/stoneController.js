const { execSync } = require('child_process');
const path = require('path');
const { privateDecrypt, createHash, createDecipheriv } = require("crypto");
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
    "data": "164da4d83f6276e3d821e64e73f2644a4ea3229fed8d22eed0b32a57596d8f0eef842dbcf45c61a87531b2789dd8758c19a0d1f989e09befce2946578ca15c685286a834827e0ff86ab7c0b08589c5f13bca586e115c98d11af3282e1f91603435b99d04d6fe33dc4e1f8b3b08ea49fca0793e7a07380efca91a504bcb176d9568f5b2ecb8ee3d020bb797f1cfbc128cb84e1353bfc05572e038f2d88508013938a34251bcce8b8fae29a7828f0dd0f5c9a1cfe1375cf92e7ae60e680542f43b00a1346845df165ee57f452890f21b937383a4b2c55738a726aa83baed481a0287d9eea815c23c256867a56f0578718ec75ad19aa46b4178ae537eceaafa3019"
  };

  const jsonResponse_748 = {
    "success": true,
    "data": "a8d96694cf0ae77460f8c1510f353f9bebad64294f69e3db43311832f21bbc7e32e40b6e014c874e28f9035cd2ea98f16e1ddb2fbbddbd9f344419eda8013329bcabbf6850626d462f6d94a1e4961c8883240a95eee8165b1e8505b20a88b9d3c8607abf274e99e5f2c9950405158cc07b6efab55ae640ea00a0afa34b8a9e2046aa913a8054c3634301683e60778e1dbe43692bcdbf17b76247da46e46d77d668e90f8e7d04d97b3d27abc5ef3f376307afb914392a6072ae2a772eb16122c31c9178a5879f298dd1654e964980c0b8164f680f7f59b3c85b1a7eb6ac112619f729a59d121370cc1859f5ec377e1deb8956053b2e102e36c2e11df66e7eae69"
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

  //return response.status(400).json([{ error: 'deu erro ao consultar conta stone' }]);
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

  //return response.status(403).json([{"success": false, "error": "Recomendar que cliente siga o processo pelo app!" }]);
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

  // return response.status(400).json(['deu grosópi']);
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
    const { stoneCode } = request.params;
    let filePath = "";

    console.log("Stone Code recebido: ", stoneCode);

    if (stoneCode === '4008-FWXG') { // Empresa 4008
      filePath = 'C:\\temp\\stone\\4008-arquivo-financeiro-votorantim.xml';
      console.log("Arquivo selecionado para empresa 4008: ", filePath);
    } else if (stoneCode === '4014-XPTO') { // Empresa 4014
      filePath = 'C:\\temp\\stone\\4014-arquivo-financeiro-votorantim.xml';
      console.log("Arquivo selecionado para empresa 4014: ", filePath);
    } else if (stoneCode === '272440958') { // Cliente 200001 - StoneCode = 272440958
      filePath = 'C:\\temp\\stone\\4014-arquivo-transacional-cliente-48684123000115-272440958.xml';
      //filePath = 'C:\\temp\\stone\\48272444000102_transacional_response.xml';
      //filePath = 'C:\\temp\\stone\\11442366000137_transacional_response.xml';
      //filePath = 'C:\\temp\\stone\\82525171000107_transacional_response.xml';
      //filePath = 'C:\\temp\\stone\\arquivo-invalido.xml';
      console.log("Arquivo selecionado para cliente 200001: ", filePath);
    } else if (stoneCode === '123456789') { // Cliente 200001 - StoneCode = 123456789
      filePath = 'C:\\temp\\stone\\4014-arquivo-transacional-cliente-48684123000115-123456789.xml';
      console.log("Arquivo selecionado para cliente 200001: ", filePath);
    } else {
      filePath = "";
      console.log("Stone Code não reconhecido, nenhum arquivo selecionado.");
    }


    readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return response.status(500).json({
          message: 'Erro ao ler o arquivo XML: ' + err.message
        });
      }

      response.setHeader('Content-Type', 'application/xml');
      //return response.status(400).json([{ error: 'deu erro ao obter arquivo de conciliação da stone' }]);
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
        "username": "usuarioAdquirenteStoneConciliacao748",
        "password": "ZJuGQotz7x/LmE+Iwx34vQ==",
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

const resolverChallengeSenhaConciliacao = async (request, response) => {
  try {
    const {
      encryptedPassword,
      password,
      senhaCriptografada,
      challenge,
      client_id,
      clientId,
      username,
      user
    } = request.body;

    const senhaRecebida = encryptedPassword || password || senhaCriptografada || challenge;
    const clientIdRecebido = client_id || clientId;
    const usernameRecebido = username || user;

    if (!senhaRecebida) {
      return response.status(400).json({
        error: "Senha criptografada é obrigatória",
        message: "Envie encryptedPassword (ou password/senhaCriptografada/challenge) no body"
      });
    }

    if (!clientIdRecebido) {
      return response.status(400).json({
        error: "client_id é obrigatório",
        message: "Envie client_id (ou clientId) no body"
      });
    }

    if (!usernameRecebido) {
      return response.status(400).json({
        error: "username é obrigatório",
        message: "Envie username (ou user) no body"
      });
    }

    const key = createHash('md5').update(clientIdRecebido, 'utf8').digest();
    const iv = createHash('md5').update(usernameRecebido, 'utf8').digest();

    const decipher = createDecipheriv('aes-128-cbc', key, iv);
    const decryptedPassword = Buffer.concat([
      decipher.update(Buffer.from(senhaRecebida, 'base64')),
      decipher.final()
    ]).toString('utf8');

    return response.status(200).json({
      password: decryptedPassword,
      message: "Senha descriptografada com sucesso"
    });
  } catch (error) {
    return response.status(500).json({
      error: error.message,
      message: "Erro ao descriptografar senha"
    });
  }
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
  obterTokenConciliacao,
  resolverChallengeSenhaConciliacao
};

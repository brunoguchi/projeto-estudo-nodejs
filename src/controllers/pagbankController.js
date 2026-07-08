const dadosTransacionais = require('./files-pagbankController/transacional.json');
const dadosFinanceiros = require('./files-pagbankController/financeiro.json');
const dadosCashouts = require('./files-pagbankController/cashout.json');

const cadastrarConta = (request, response) => {
    var jsonResponse = {
        id: "ACCO_0F5107C0-3AAB-44FF-A042-48964973F8CD",
        account_id: null,
        type: "SELLER",
        email: "beryl.miller6@yahoo.com",
        business_category: "OTHER_SERVICES"
    };

    var jsonResponseMigracao = {
        "error_messages": [
            {
                "code": "42001",
                "description": "Cenário Fake de migração",
                "errors": [
                    "Intention successfully registered"
                ]
            }
        ]
    };

    var jsonResponseErro = {
        "error_messages": [
            {
                "code": "40002",
                "parameter_name": "person.address (conta PF) / company.address (conta PJ)",
                "description": "Invalid parameter.",
                "errors": [
                    "Address does not exist"
                ]
            }
        ]
    };

    //return response.status(400).json(jsonResponseErro);
    //return response.status(400).json(jsonResponseMigracao);
    return response.status(200).json(jsonResponse);
};

const listarMovimentosTransacionais = (_request, response) => {
    //return response.status(400).json("deu ruim no transacional EDI");

    return response.status(200).json({
        "detalhes": dadosTransacionais,
        "pagination": {
            "elements": 0,
            "totalPages": 1,
            "page": 1,
            "totalElements": dadosTransacionais.length
        }
    });
};

const listarMovimentosFinanceiros = (_request, response) => {
    //return response.status(400).json("deu ruim no financeiro EDI");

    return response.status(200).json({
        "detalhes": dadosFinanceiros,
        "pagination": {
            "elements": 0,
            "totalPages": 1,
            "page": 1,
            "totalElements": dadosFinanceiros.length
        }
    });
};

const listarMovimentosCashouts = (_request, response) => {
    // return response.status(400).json("deu ruim no cashout EDI");

    return response.status(200).json({
        "detalhes": dadosCashouts,
        "pagination": {
            "elements": 0,
            "totalPages": 1,
            "page": 1,
            "totalElements": dadosCashouts.length
        }
    });
};

module.exports = {
    cadastrarConta,
    listarMovimentosTransacionais,
    listarMovimentosFinanceiros,
    listarMovimentosCashouts
};

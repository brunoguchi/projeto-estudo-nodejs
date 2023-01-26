function gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gerarCNPJ() {
    const n = () => gerarNumeroAleatorio(0, 9);
    return `${n()}${n()}.${n()}${n()}${n()}.${n()}${n()}${n()}/${n()}${n()}${n()}${n()}-${n()}${n()}`;
};

function gerarCNPJSemMascara() {
    let cnpj = '';
    for (let i = 0; i < 14; i++) {
        cnpj += gerarNumeroAleatorio(0, 9).toString();
    }
    return cnpj;
};

const obterClientesAtivos = (request, response, quantidade, fixo) => {
    if (fixo === true) {
        var jsonResponse = {
            "clienteId": "001000004",
            "cnpj": gerarCNPJSemMascara()
        }
        return response.status(200).json(jsonResponse);
    }

    const clientesAtivos = Array.from({ length: quantidade }, () => ({
        clienteId: gerarNumeroAleatorio(1, 1000),
        cnpj: gerarCNPJSemMascara()
    }));

    return response.status(200).json(clientesAtivos);
};

module.exports = {
    obterClientesAtivos
};

const handleAlert = (request, response, emoji, message) => {
    const timestamp = new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour12: false
    });

    console.log(`[${timestamp}] ${emoji} ${message}: ${JSON.stringify(request.body)}`);
    console.log("========================================================================");

    return response.status(200).json(true);
};

const postAlertGeral = (req, res) => handleAlert(req, res, "✅", "CHAMOU ALERTA GERAL");
const postAlertPainel3 = (req, res) => handleAlert(req, res, "💥", "CHAMOU ALERTA TAXA FALHA");
const postAlertPainel4 = (req, res) => handleAlert(req, res, "❌", "CHAMOU ALERTA SUCESSO/FALHA");
const postAlertPainel9 = (req, res) => handleAlert(req, res, "😆", "CHAMOU ALERTA RESPONSE DELAY");

module.exports =
{
    postAlertGeral,
    postAlertPainel3,
    postAlertPainel4,
    postAlertPainel9
};

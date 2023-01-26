const getWithParams = (request, response) => {
    const timestamp = new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour12: false
    });

    console.log(`[${timestamp}] 🔍 CHAMOU GET COM PARÂMETROS`);
    console.log("Route Params:", JSON.stringify(request.params));
    console.log("Query Params:", JSON.stringify(request.query));
    console.log("========================================================================");

    return response.status(200).json({
        routeParams: request.params,
        queryParams: request.query
    });
};

const postWithParams = (request, response) => {
    const timestamp = new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour12: false
    });

    console.log(`[${timestamp}] CHAMOU POST COM PARÂMETROS: ${JSON.stringify(request.body)}`);
    console.log(`[${timestamp}] HEADERS: ${JSON.stringify(request.headers)}`);
    console.log("========================================================================");

    return response.status(200).json({
        body: request.body
    });
};


module.exports =
{
    getWithParams,
    postWithParams
};

const getCnpjs =
    (request, response) => {
        console.log('Header Authorization:', request.headers['authorization']);

        // response do cliente 200001
        const jsonResponse = [
            '48684123000115',
            '48684123000225',
            '58684123000335',
            '58684123000445'
        ];

        //return response.status(400).json("deu ruim no link da loja");
        return response.status(200).json(jsonResponse);
    };

module.exports =
{
    getCnpjs
};
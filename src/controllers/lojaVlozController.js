const getCnpjs =
    (request, response) => {
        console.log('Header Authorization:', request.headers['authorization']);

        // response do cliente 200001
        const jsonResponse = [
            '48684123000115'
        ];

        return response.status(200).json(jsonResponse);
    };

module.exports =
{
    getCnpjs
};
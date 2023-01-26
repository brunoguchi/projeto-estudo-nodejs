const getByHttpStatus = (request, response, httpStatus) => {
    return response.status(httpStatus).json(true);
};

module.exports =
{
    getByHttpStatus
};

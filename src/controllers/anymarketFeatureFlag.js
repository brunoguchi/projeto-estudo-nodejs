const getFeatureFlag = (request, response) => {
    const identifier = request.params.identifier;
    const key = request.params.key;

    console.log(`identifier: ${identifier} || key: ${key}`);

    if (identifier === '47.' && key === 'PRICE_NOTIFICATION_FEATURE_FLAG') {
        return response.status(200).json({
            identifier: '11223344.',
            key: 'PRICE_NOTIFICATION_FEATURE_FLAG'
        });
    }

    return response.status(400).json({
        status: 'NOT_FOUND',
        message: 'Configuration not found!'
    });
};

module.exports =
{
    getFeatureFlag
};

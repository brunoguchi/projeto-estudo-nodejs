const getFeatureFlag = (request, response) => {
    const identifier = request.params.identifier;
    const key = request.params.key;

    console.log(`Received request for feature flag with identifier: ${identifier} and key: ${key}`);

    if (identifier === '47.' && key === 'PRICE_NOTIFICATION_FEATURE_FLAG') {
        return response.status(200).json({
            identifier: '22449504.',
            key: 'PRICE_EXPORT_NEW_FLOW'
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

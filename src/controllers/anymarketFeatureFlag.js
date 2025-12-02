const getFeatureFlagV2 = (request, response) => {
    const identifier = request.params.identifier;
    const key = request.params.key;

    console.log(`getFeatureFlagV2 - identifier: ${identifier} || key: ${key}`);

    if (identifier === '47.' && key === 'PRICE_NOTIFICATION_FEATURE_FLAG') {
        return response.status(200).json({
            identifier: '11223344.',
            key: 'PRICE_NOTIFICATION_FEATURE_FLAG'
        });
    }

    return response.status(404).json({
        status: 'NOT_FOUND',
        message: 'Configuration not found!'
    });
};

const getFeatureFlagCore = (request, response) => {
    const identifier = request.params.identifier;
    const key = request.params.key;

    console.log(`getFeatureFlagCore - identifier: ${identifier} || key: ${key}`);

    if (identifier === '47.' && key === 'PRICE_NOTIFICATION_FEATURE_FLAG') {
        return response.status(200).json(true);
    }

    return response.status(200).json(false);
};

module.exports =
{
    getFeatureFlagV2,
    getFeatureFlagCore
};

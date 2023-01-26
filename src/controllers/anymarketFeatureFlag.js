const getFeatureFlag = (request, response, source) => {
    const { identifier, key } = request.params;

    console.log(`getFeatureFlag - source: ${source} || identifier: ${identifier} || key: ${key}`);

    if (identifier === '47.' && key === 'PRICE_NOTIFICATION_FEATURE_FLAG') {
        return source === 'V2'
            ? response.status(200).json({ identifier: '11223344.', key })
            : response.status(200).json(true);
    }

    return source === 'V2'
        ? response.status(404).json({ status: 'NOT_FOUND', message: 'Configuration not found!' })
        : response.status(200).json(false);
};

module.exports =
{
    getFeatureFlag
};

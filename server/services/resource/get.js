const _Resource = require('../../models/Resource');

const ResourceGet = (() => {
    const getAllResources = async (data) => {
        try {
            const resources = await _Resource.find({username: data.username}).exec();
            return {
                resources: resources
            }
        } catch (err) {
            return {
                error: err.message
            };
        }
    }

    return {
        getAllResources
    }
})()

module.exports = ResourceGet;
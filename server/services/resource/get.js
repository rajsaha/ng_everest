const _Resource = require('../../models/Resource');

const ResourceGet = (() => {
    const getAllResources = async (data) => {
        try {
            const resources = await _Resource.find({username: data.username}).sort({timestamp: -1}).exec();
            return {
                resources: resources
            }
        } catch (err) {
            return {
                error: err.message
            }
        }
    }

    const getResource = async (data) => {
        try {
            const resource = await _Resource.findById(data).exec();
            return {
                resource: resource
            }
        } catch (err) {
            return {
                error: err.message
            }
        }
    }

    return {
        getAllResources,
        getResource
    }
})()

module.exports = ResourceGet;
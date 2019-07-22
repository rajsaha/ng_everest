const _Resource = require('../../models/Resource');
const Imgur = require('../imgur/imgur');

const DeleteResource = (() => {
    const deleteResource = async (data) => {
        try {
            const resource = await _Resource.findById(data.id).exec();
            // TODO: Delete resource from all collections
            if (resource && resource.deleteHash) {
                // Delete image from imgur
                await Imgur.deleteImage(resource.deleteHash);
                await _Resource.findOneAndRemove({_id: data.id}).exec();
                return {
                    message: {
                        error: false,
                        status: 200
                    }
                }
            } else if (resource) {
                await _Resource.findOneAndRemove({_id: data.id}).exec();
                return {
                    message: {
                        error: false,
                        status: 200
                    }
                }
            } else {
                return {
                    error: 'Resource not found'
                }
            }
        } catch (err) {
            return {
                error: err.message
            };
        }
    }

    return {
        deleteResource
    }
})()

module.exports = DeleteResource;
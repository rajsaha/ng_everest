const _Resource = require('../../models/Resource');

const DeleteResource = (() => {
    const deleteResource = async (data) => {
        try {
            // TODO: Check if image has deleteHash
            // TODO: (Optional) Do resource image delete if custom image
            // TODO: Delete resource
            const resource = await _Resource.findById(data.id).exec();
            console.log(resource);
            return {
                resource: resource
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
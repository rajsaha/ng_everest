const _Resource = require('../../models/Resource');
const Imgur = require('../imgur/imgur');

const EditResource = (() => {
    const updateResource = async (data) => {
        try {
            // * Handle user uploading custom image
            if (data.customImage) {
                // * Get response from imgur
                // * If deleteHash not null, delete image
                const checkForDeleteHashResult = await checkForDeleteHash(data.id);
                const saveCustomImageForResourceResponse = await Imgur.saveImage(data.customImage);
                const update = {
                    username: data.formData.username,
                    url: data.formData.url,
                    title: data.formData.title,
                    type: data.formData.type,
                    description: data.formData.description,
                    image: saveCustomImageForResourceResponse.data.data.link,
                    deleteHash: saveCustomImageForResourceResponse.data.data.deletehash,
                    tags: data.tags
                };

                await resource.save();

                if (data.formData.collectionName) {
                    const collection = await Collection.getCollectionByTitle(data.formData.collectionName);
                    if (collection.collection) {
                        // * Push into existing collection
                        await Collection.pushIntoCollection({
                            title: data.formData.collectionName,
                            resourceId: resource.id
                        });
                    } else {
                        // * Create new collection and push resource into it
                        await Collection.createCollectionAndPushResource({
                            username: data.formData.username,
                            title: data.formData.title,
                            resourceId: resource.id
                        });
                    }
                }

                return {
                    message: {
                        error: false,
                        status: 200,
                        data: {
                            message: 'Resource saved!'
                        }
                    }
                };
            } else {
                const resource = new Resource({
                    _id: new mongoose.Types.ObjectId(),
                    username: data.formData.username,
                    url: data.formData.url,
                    title: data.formData.title,
                    type: data.formData.type,
                    description: data.formData.description,
                    image: data.formData.image,
                    deleteHash: null,
                    tags: data.tags
                });

                await resource.save();

                if (data.formData.collectionName) {
                    const collection = await Collection.getCollectionByTitle(data.formData.collectionName);
                    if (collection.collection) {
                        // * Push into existing collection
                        await Collection.pushIntoCollection({
                            title: data.formData.collectionName,
                            resourceId: resource.id
                        });
                    } else {
                        // * Create new collection and push resource into it
                        await Collection.createCollectionAndPushResource({
                            username: data.formData.username,
                            title: data.formData.collectionName,
                            resourceId: resource.id
                        });
                    }
                }

                return {
                    message: {
                        error: false,
                        status: 200,
                        data: {
                            message: 'Resource saved!'
                        }
                    }
                };
            }
        } catch (error) {
            return {
                status: 500,
                error: error.message
            };
        }
    }

    const checkForDeleteHash = async (id) => {
        const resource = await _Resource.findById(id).exec();
        if (resource && resource.deleteHash) {
            await Imgur.deleteHash(resource.deleteHash);
            return true;
        } else {
            return false;
        }
    }

    const removeTag = async (data) => {
        try {
            const resource = await _Resource.updateOne({
                _id: data.id
            }, {
                    $pull: {
                        tags: data.tag
                    }
                }).exec();
            return {
                message: `${data.tag} removed`
            }
        } catch (err) {
            console.log(err);
            return {
                error: err.message
            };
        }
    }

    return {
        updateResource,
        removeTag
    }
})()

module.exports = EditResource;
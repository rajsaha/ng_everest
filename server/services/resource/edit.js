const _Resource = require('../../models/Resource');
const CollectionService = require('../collection/collection');
const Imgur = require('../imgur/imgur');

const EditResource = (() => {
    const editResource = async (data) => {
        try {
            let saveCustomImageForResourceResponse = null;
            let image = null;
            let deleteHash = null;

            // * Handle user uploading custom image
            if (data.customImage) {
                // * If deleteHash not null, delete image
                const checkForDeleteHashResult = await checkForDeleteHash(data.formData.id);
                if (checkForDeleteHashResult) {
                    console.log('Resource had deleteHash');
                }

                // * Get image link and delete hash from imgur
                saveCustomImageForResourceResponse = await Imgur.saveImage(data.customImage);
                image = saveCustomImageForResourceResponse.data.data.link;
                deleteHash = saveCustomImageForResourceResponse.data.data.deletehash;
            } else {
                image = data.formData.image;
            }

            const query = {
                _id: data.formData.id
            }

            const update = {
                $set: {
                    url: data.formData.url ? data.formData.url : '',
                    title: data.formData.title ? data.formData.title : '',
                    description: data.formData.description ? data.formData.description : '',
                    image: image,
                    deleteHash: deleteHash,
                },
                $addToSet: {
                    tags: {
                        $each: data.tags
                    }
                },
                safe: {
                    new: true,
                    upsert: true
                }
            };

            // * Run update
            const resource = await _Resource.updateOne(query, update).exec();

            // * Put resource into collection or not
            if (data.formData.collectionName) {
                const collection = await CollectionService.getCollectionByTitle(data.formData.collectionName);
                const resource = await CollectionService.checkForResourceInCollection(data.formData.id);

                // * If collection exists and resource does NOT exist in collection
                if (collection.collection && !resource) {
                    // * Push into existing collection
                    await CollectionService.pushIntoCollection({
                        title: data.formData.collectionName,
                        resourceId: data.formData.id
                    });
                } else {
                    // * Create new collection and push resource into it
                    await CollectionService.createCollectionAndPushResource({
                        username: data.formData.username,
                        title: data.formData.title,
                        resourceId: data.formData.id
                    });
                }
            }

            return {
                message: {
                    error: false,
                    status: 200,
                    data: {
                        message: 'Resource updated!'
                    }
                }
            };
        } catch (error) {
            console.error(error);
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
        editResource,
        removeTag
    }
})()

module.exports = EditResource;
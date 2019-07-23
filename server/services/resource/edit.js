const _Resource = require('../../models/Resource');
const Imgur = require('../imgur/imgur');

const EditResource = (() => {
    const updateResource = async (data) => {
        try {
            let saveCustomImageForResourceResponse = null;
            let image = null;
            let deleteHash = null;

            // * Handle user uploading custom image
            if (data.customImage) {
                // * Get image link and delete hash from imgur
                saveCustomImageForResourceResponse = await Imgur.saveImage(data.customImage);
                image = saveCustomImageForResourceResponse.data.data.link;
                deleteHash = saveCustomImageForResourceResponse.data.data.deletehash;
            } else {
                image = data.formData.image;
            }

            // * If deleteHash not null, delete image
            const checkForDeleteHashResult = await checkForDeleteHash(data.id);
            if (checkForDeleteHashResult) {
                console.log('Resource had deleteHash');
            } else {
                console.log('Resource did not have deleteHash');
            }

            const query = {
                _id: data.id
            }

            const update = {
                $set: {
                    url: data.formData.url ? data.formData : '',
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
            const resoure = await _Resource.updateOne(query, update).exec();

            // * Put resource into collection or not
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
                        message: 'Resource updated!'
                    }
                }
            };
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
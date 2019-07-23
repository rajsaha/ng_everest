const ogs = require('open-graph-scraper');
const mongoose = require('mongoose');
const axios = require('axios');
const Resource = require('../../models/Resource');
const Collection = require('../collection/collection');
const Imgur = require('../imgur/imgur');

const ResourceShare = (() => {
    const getOpenGraphData = async (url) => {
        const response = await ogs({
            'url': url
        });

        if (!response) {
            return {
                message: response
            }
        } else {
            return {
                message: {
                    error: false,
                    status: 200,
                    data: response
                }
            }
        }
    }

    const shareResource = async (data) => {
        try {
            // * Handle user uploading custom image
            if (data.customImage) {
                // * Get response from imgur
                const saveCustomImageForResourceResponse = await Imgur.saveImage(data.customImage);
                const resource = new Resource({
                    _id: new mongoose.Types.ObjectId(),
                    username: data.formData.username,
                    url: data.formData.url,
                    title: data.formData.title,
                    type: data.formData.type,
                    description: data.formData.description,
                    image: saveCustomImageForResourceResponse.data.data.link,
                    deleteHash: saveCustomImageForResourceResponse.data.data.deletehash,
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

    return {
        getOpenGraphData,
        shareResource
    }
})()

module.exports = ResourceShare;
const ogs = require('open-graph-scraper');
const mongoose = require('mongoose');
const axios = require('axios');
const Resource = require('../../models/Resource');

const Share = (() => {
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
                const saveCustomImageForResourceResponse = await saveCustomImageForResource(data.customImage);
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

    const saveCustomImageForResource = async (image) => {
        const replacedBase64String = image.replace(/^data:image\/[a-z]+;base64,/, "");
        const savePhoto = axios.create({
            headers: {
                'Authorization': `Client-ID ${process.env.CLIENT_ID}`
            }
        });
        const savePhotoResponse = await savePhoto.post(process.env.IMAGE_UPLOAD_URL, replacedBase64String);
        return savePhotoResponse;
    }

    return {
        getOpenGraphData,
        shareResource
    }
})()

module.exports = Share;
const ogs = require('open-graph-scraper');
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
            const replacedBase64String = data.image.replace(/^data:image\/[a-z]+;base64,/, "");
            const savePhoto = axios.create({
                headers: {
                    'Authorization': `Client-ID ${process.env.CLIENT_ID}`
                }
            });
            const savePhotoResponse = await savePhoto.post(process.env.IMAGE_UPLOAD_URL, replacedBase64String);

            const resource = new Resource({
                _id: new mongoose.Types.ObjectId(),
                username: data.formData.username,
                url: data.formData.url,
                title: data.formData.title,
                type: data.formData.type,
                description: data.formData.description,
                image: savePhotoResponse.data.data.link,
                $addToSet: {
                    tags: {
                        $each: data.tags
                    }
                },
            });

            await resource.save();
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

module.exports = Share;
const Imgur = (() => {
    const deleteImage = async (deleteHash) => {
        try {
            const deletePhoto = axios.create({
                headers: {
                    'Authorization': `Client-ID ${process.env.CLIENT_ID}`
                }
            });

            await deletePhoto.delete(`${process.env.IMAGE_DELETE_URL}/${deleteHash}`);
            return true;
        } catch (err) {
            return {
                error: err.message
            };
        }
    }

    const saveImage = async (image) => {
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
        deleteImage,
        saveImage
    }
})()

module.exports = Imgur;
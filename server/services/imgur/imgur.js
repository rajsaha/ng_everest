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

    return {
        deleteImage
    }
})()

module.exports = Imgur;
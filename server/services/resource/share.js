const ogs = require('open-graph-scraper');

const Share = (() => {
    const shareResource = async (url) => {
        const response = await ogs({ 'url': url });
        
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

    return {
        shareResource
    }
})()

module.exports = Share;
const ogs = require('open-graph-scraper');

const Share = (() => {
    const shareResource = async (url) => {
        ogs({ 'url': url }, function (error, results) {
            console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
            console.log('results:', results);
        });
    }

    return {
        shareResource
    }
})()

module.exports = Share;
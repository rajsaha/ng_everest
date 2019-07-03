const mongoose = require('mongoose');
const Collection = require('../../models/Collection');

const Collection = (() => {
    const getCollectionNames = async (username) => {
        try {
            const collection = await Collection.findOne({username: username}).select('title').exec();
            return {
                collections: collection
            }
        } catch (err) {
            return {
                error: err.message
            };
        }
    }

    return {}
})()

module.exports = Collection;
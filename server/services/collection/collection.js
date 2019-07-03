const mongoose = require('mongoose');
const _Collection = require('../../models/Collection');

const Collection = (() => {
    const getCollectionNames = async (username) => {
        try {
            const collection = await _Collection.findOne({username: username}).select('title').exec();
            return {
                collections: collection
            }
        } catch (err) {
            return {
                error: err.message
            };
        }
    }

    const createCollection = async (data) => {
        try {
            const collection = new _Collection({
                _id: new mongoose.Types.ObjectId(),
                username: data.username,
                title: data.title
            }); 

            await collection.save();
            return {
                message: {
                    error: false,
                    status: 200,
                    data: {
                        message: 'Collection saved!'
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

    return {
        getCollectionNames,
        createCollection
    }
})()

module.exports = Collection;
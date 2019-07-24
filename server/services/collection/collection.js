const mongoose = require('mongoose');
const _Collection = require('../../models/Collection');

const Collection = (() => {
    const getCollectionNames = async (username) => {
        try {
            const collection = await _Collection.find({username: username}).select('title').exec();
            return {
                collections: collection
            }
        } catch (err) {
            return {
                error: err.message
            };
        }
    }

    const getCollectionNameByResourceId = async (resourceId) => {
        try {
            const collection = await _Collection.findOne({resources: resourceId}).select('title').exec();
            return {
                collection: collection
            }
        } catch (err) {
            return {
                error: err.message
            }
        }
    }

    const getCollectionByTitle = async (title) => {
        try {
            const collection = await _Collection.findOne({title: title}).exec();
            return {
                collection: collection
            }
        } catch (err) {
            return {
                error: err.message
            };
        }
    }

    const pushIntoCollection = async (data) => {
        try {
            const query = {
                title: data.title
            };

            const update = {
                $push: {
                    resources: data.resourceId
                },
                safe: {
                    new: true,
                    upsert: true
                }
            };

            const pushIntoCollectionResult = await _Collection.findOneAndUpdate(query, update).exec();

            return {
                message: {
                    error: false,
                    status: 200,
                    data: {
                        message: 'Saved to collection!'
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

    const createCollectionAndPushResource = async (data) => {
        try {
            // * Create new collection
            const collection = new _Collection({
                _id: new mongoose.Types.ObjectId(),
                username: data.username,
                title: data.title
            }); 

            await collection.save();
            
            // * Push resource id into collection
            const query = {
                _id: collection.id
            };

            const update = {
                $push: {
                    resources: data.resourceId
                },
                safe: {
                    new: true,
                    upsert: true
                }
            };

            await _Collection.findOneAndUpdate(query, update).exec(); 

            return {
                message: {
                    error: false,
                    status: 200,
                    data: {
                        message: 'Saved to collection!'
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

    const checkForResourceInCollection = async (id) => {
        const response = await _Collection.find({resources: id}).exec();
        if (response) return true;
        return false;
    }

    return {
        getCollectionNames,
        getCollectionNameByResourceId,
        getCollectionByTitle,
        pushIntoCollection,
        createCollectionAndPushResource,
        checkForResourceInCollection
    }
})()

module.exports = Collection;
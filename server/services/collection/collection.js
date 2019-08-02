const mongoose = require('mongoose');
const _Collection = require('../../models/Collection');

const Collection = (() => {
    const getCollections = async (username) => {
        try {
            const collections = await _Collection.find({
                username: username
            }).exec();
            return {
                collections: collections
            }
        } catch (err) {
            return {
                error: err.message
            }
        }
    }

    const getCollectionNames = async (username) => {
        try {
            const collection = await _Collection.find({
                username: username
            }).select('title').exec();
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
            const collection = await _Collection.findOne({
                resources: resourceId
            }).select('title').exec();
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
            const collection = await _Collection.findOne({
                title: title
            }).exec();
            return {
                collection: collection
            }
        } catch (err) {
            return {
                error: err.message
            };
        }
    }

    const getCollectionById = async (id) => {
        try {
            const collection = await _Collection.findById(id).exec();
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

    const createCollectionAndPushResource = async (data) => {
        try {
            // * Create new collection
            const collection = new _Collection({
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
            console.error(error);
            return {
                status: 500,
                error: error.message
            };
        }
    }

    const checkForResourceInAnyCollection = async (id) => {
        const response = await _Collection.find({
            resources: id
        }).exec();
        if (response.length > 0) {
            return {
                isInCollection: true,
                response
            }
        }
        return {
            isInCollection: false
        };
    }

    const deleteResourceFromCollection = async (data) => {
        const response = await _Collection.updateOne({
            _id: data.collectionId
        }, {
            $pull: {
                resources: data.resourceId
            }
        }).exec();
        if (response) {
            return true;
        }
        return false;
    }

    return {
        getCollections,
        getCollectionNames,
        getCollectionNameByResourceId,
        getCollectionByTitle,
        getCollectionById,
        pushIntoCollection,
        createCollectionAndPushResource,
        checkForResourceInAnyCollection,
        deleteResourceFromCollection
    }
})()

module.exports = Collection;
const ogs = require('open-graph-scraper');
const mongoose = require('mongoose');
const axios = require('axios');
const _Resource = require('../../models/Resource');
const Collection = require('../collection/collection');

const Resource = (() => {
    const getAllResources = async (data) => {
        try {
            const resources = await _Resource.find({username: data.username}).exec();
            return {
                resources: resources
            }
        } catch (err) {
            return {
                error: err.message
            };
        }
    }

    return {
        getAllResources
    }
})()

module.exports = Resource;
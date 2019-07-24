const express = require('express');
const router = express.Router();
const Collection = require('../../../services/collection/collection');
const checkIfAuthenticated = require('../../../services/auth/checkIfAuthorized');

router.post('/get-collection-names', checkIfAuthenticated, async (req, res, next) => {
    try {
        const response = await Collection.getCollectionNames(req.body.username);
        res.status(200).json(response);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

router.post('/get-collection-title-by-resource-id', checkIfAuthenticated, async (req, res, next) => {
    try {
        const response = await Collection.getCollectionNameByResourceId(req.body.resourceId);
        res.status(200).json(response);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

router.post('/check-for-resource-in-collection', checkIfAuthenticated, async (req, res, next) => {
    try {
        const response = await Collection.checkForResourceInCollection(req.body.id);
        res.status(200).json(response);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

module.exports = router;
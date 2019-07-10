const express = require('express');
const router = express.Router();
const ResourceShare = require('../../../services/resource/share');
const checkIfAuthenticated = require('../../../services/auth/checkIfAuthorized');

router.post('/get-opengraph-data', checkIfAuthenticated, async (req, res, next) => {
    try {
        const response = await ResourceShare.getOpenGraphData(req.body.url);
        res.status(200).json(response);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

router.post('/share-resource', checkIfAuthenticated, async (req, res, next) => {
    try {
        const response = await ResourceShare.shareResource(req.body);
        res.status(200).json(response);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

module.exports = router;
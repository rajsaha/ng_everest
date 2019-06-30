const express = require('express');
const router = express.Router();
const Resource = require('../../../services/resource/share');
const checkIfAuthenticated = require('../../../services/auth/checkIfAuthorized');

router.post('/share-resource', checkIfAuthenticated, async (req, res, next) => {
    try {
        const response = await Resource.shareResource(req.body.url);
        res.status(200).json(response);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

module.exports = router;
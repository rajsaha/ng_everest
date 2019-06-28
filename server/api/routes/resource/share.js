const express = require('express');
const router = express.Router();
const Resource = require('../../../services/resource/share');
const checkIfAuthenticated = require('../../../services/auth/checkIfAuthorized');

router.get('/share-resource', checkIfAuthenticated, async (req, res, next) => {
    try {
        const response = await Resource.shareResource(req.body);
        res.status(200).json(response);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});
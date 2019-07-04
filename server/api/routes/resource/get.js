const express = require('express');
const router = express.Router();
const Resource = require('../../../services/resource/get');
const checkIfAuthenticated = require('../../../services/auth/checkIfAuthorized');

router.post('/all', checkIfAuthenticated, async (req, res, next) => {
    try {
        const response = await Resource.getAllResources(req.body);
        res.status(200).json(response);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

module.exports = router;
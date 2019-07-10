const express = require('express');
const router = express.Router();
const ResourceDelete = require('../../../services/resource/delete');
const checkIfAuthenticated = require('../../../services/auth/checkIfAuthorized');

router.post('/', checkIfAuthenticated, async (req, res, next) => {
    try {
        const response = await ResourceDelete.deleteResource(req.body);
        res.status(200).json(response);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

module.exports = router;
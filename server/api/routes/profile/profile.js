const express = require('express');
const router = express.Router();
const Profile = require('../../../services/profile/profile');
const checkIfAuthenticated = require('../../../services/auth/checkIfAuthorized');

router.get('/get-user-data/:username', checkIfAuthenticated, async (req, res, next) => {
    try {
        const response = await Profile.getProfileData(req.params.username);
        res.status(200).json(response);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

router.post('/update-user-data', async (req, res, next) => {
    try {
        const response = await Profile.updateProfileData(req.body);
        res.status(200).json(response);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

module.exports = router;
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

router.post('/remove-user-interest', async (req, res, next) => {
    try {
        const response = await Profile.removeInterest(req.body);
        res.status(200).json(response);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

router.post('/save-profile-photo', async (req, res, next) => {
    try {
        const response = await Profile.saveProfilePhoto(req.body.id, req.body.image, req.body.username);
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
    }
});

router.delete('/delete-profile-photo/:id/:deleteHash', async (req, res, next) => {
    try {
        const response = await Profile.deleteProfilePhoto(req.params.id, req.params.deleteHash);
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
    }
});

router.get('/get-profile-photo/:username', async (req, res, next) => {
    try {
        const response = await Profile.getProfilePhoto(req.params.username);
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
    }
});

router.post('/update-password', async (req, res, next) => {
    try {
        const response = await Profile.changePassword(req.body);
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;
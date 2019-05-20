const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const User = require('../../../models/User');

router.post('/', async (req, res, next) => {
    const loginCred = {
        username: req.body.username,
        password: req.body.password
    };
    
    try {
        const user = await User.findOne({ username: loginCred.username }).exec();

        // If no username found
        if (!user) {
            return res.status(400).json({
                message: "The username does not exist"
            });
        }

        // Compare plaintext password with hash
        user.comparePassword(loginCred.password, user.password, (error, match) => {
            if (!match) {
                return res.status(400).json({
                    error: error,
                    message: "The password is invalid"
                });
            }
        });

        res.status(200).json({
            message: "Logged in"
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;
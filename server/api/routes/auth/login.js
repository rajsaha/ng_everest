const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const User = require('../../../models/User');

router.post('/', (req, res, next) => {
    const loginCred = {
        username: req.body.username,
        password: req.body.password
    };

    User.findOne({ username: loginCred.username }).then((data) => {
        // If data is null
        if (!data) {
            return res.status(400).json({
                message: 'User not found'
            });
        }

        // If password is invalid
        if (!bcryptjs.compareSync(loginCred.password, data.password)) {
            return res.status(400).json({
                message: 'Password is invalid'
            });
        }

        return res.status(200).json({
            message: 'Logged in successfully'
        });        
    }).catch((err) => {
        return res.status(404).json({
            error: err.message
        });
    });
});

module.exports = router;
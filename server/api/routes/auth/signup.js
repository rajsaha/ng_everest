const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const Validation = require('../../../services/validation/validation');
const User = require('../../../models/User');

router.post('/', async (req, res, next) => {
    const signup_validation_result = Validation.SignUpDataValidation(req.body.email, req.body.username, req.body.password).then((response) => {
        return response.status
    });

    if (signup_validation_result) {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });

        try {
            const result = await user.save();
            res.status(200).json({
                result: result
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    } else {
        res.status(500).json({
            error: 'Validation failed',
            messages: response.messages
        });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Validation = require('../../../services/validation/validation');
const User = require('../../../models/User');

router.post('/', (req, res, next) => {
    const signup_validation_result = Validation.SignUpDataValidation(req.body.email, req.body.username, req.body.password);
    signup_validation_result.then((response) => {
        if (response.status) {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            });
            user.save()
                .then(result => {
                    res.status(200).json({
                        message: 'Handling POST request to /auth/signup',
                        result: result
                    });
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({
                        error: err
                    });
                });
        } else {
            res.status(500).json({
                error: 'Validation failed',
                messages: response.messages
            });
        }
    });
});

module.exports = router;
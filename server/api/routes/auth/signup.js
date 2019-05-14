const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../../../models/User');

router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    user.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Handling POST request to /auth/signup',
            result: user
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;
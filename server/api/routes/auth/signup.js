const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../../../models/User');

router.post('/signup', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password
    });
    user.save()
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.error(err);
    });
    res.status(200).json({
        message: 'Handling POST request to /auth/signup'
    });
});

module.exports = router;
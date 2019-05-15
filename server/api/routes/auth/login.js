const express = require('express');
const router = express.Router();
const User = require('../../../models/User');

router.post('/', (req, res, next) => {
    const loginCred = {
        username: req.body.username,
        password: req.body.password
    };

    User.findOne({
        username: loginCred.username,
        password: loginCred.password
    }).then((result) => {
        if (result) {
            res.status(200).json({
                message: 'Handling POST request to /login',
                result: result
            });
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            error: err
        });
    });


});

module.exports = router;
const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    const loginCred = {
        username: req.body.username,
        password: req.body.password
    };
    res.status(201).json({
        message: 'Handling POST request to /auth/login',
        login: loginCred
    });
});

module.exports = router;
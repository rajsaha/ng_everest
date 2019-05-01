const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST request to /auth/login'
    });
});

module.exports = router;
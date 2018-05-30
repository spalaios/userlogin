const express = require('express');
const { check, validationResult } = require('express-validator/check');

const router = express.Router();

router.get('/login', (req, res, next) => {
    res.render('login', {
        title : 'login'
    });
});


module.exports = router;
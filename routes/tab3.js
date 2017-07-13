const express = require('express');
const router = express.Router();

//const checkLogin = require('../middlewares/check').checkLogin;

router.get('/', function (req, res, next) {
    res.render('tab3');
});

module.exports = router;
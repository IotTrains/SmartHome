const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('tab3');
});

module.exports = router;
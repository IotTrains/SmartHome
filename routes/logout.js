const express = require('express');
const router = express.Router();

//const checkLogin = require('../middlewares/check').checkLogin;

router.get('/', function (req, res, next) {
    //清空session中的用户信息
    req.session.user = null;
    //req.flash('success', '登出成功');

    return res.redirect('back');
    //console.log('hi');
    //res.send(req.session.user);
    //req.flash('success', '登出成功');

});

module.exports = router;
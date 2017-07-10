const express = require('express'),
    sha1 = require('sha1'),
    router = express.Router(),
    UserModel = require('../models/users'),
    checkNotLogin = require('../middlewares/check').checkNotLogin;

//GET /login 登录页
router.get('/', checkNotLogin, function (req, res, next) {
    res.render('login.ejs');
});

//POST /login 用户登录
router.post('/', checkNotLogin, function (req, res, next) {
    var userName = req.body.userName;
    var userPwd = req.body.userPwd;

    UserModel.getUserByName(userName)
        .then(function (user) {
            if (!user) {
                req.flash('error', '用户不存在');
                return res.redirect('back');
            }
            //检查密码是否匹配
            if (sha1(userPwd) !== user.userPwd) {
                req.flash('error', '用户名或密码错误');
                return res.redirect('back');
            }
            req.flash('success', '登录成功');
            delete user.userPwd;
            req.session.user = user;

            res.redirect('/home');
        })
        .catch(next);
});

module.exports = router;
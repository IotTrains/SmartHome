const fs = require('fs');
const path = require('path');
const sha1 = require('sha1');
const express = require('express');
const router = express.Router();

const userModel = require('../models/users');
const checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/', checkNotLogin, function (req, res, next) {
    res.render('register');
});

router.post('/', checkNotLogin, function (req, res, next) {
    let userName = req.body.userName;
    let userPwd = req.body.userPwd;
    let userRePwd = req.body.userRePwd;
    try {
        if (!(userName.length >= 1 && userName.length <= 18)) {
            throw new Error('名字限制在1-18字符');
        }
        if (userPwd.length < 6) {
            throw new Error('密码至少6个字符');
        }
        if (userPwd !== userRePwd) {
            throw new Error('两次密码不一致');
        }
    } catch(e) {
        req.flash('error', e.message);
        return res.redirect('/register');
    }
    //加密密码
    userPwd = sha1(userPwd);
    let user = {
        userName: userName,
        userPwd: userPwd
    };
    userModel.create(user)
        .then(function (result) {
            //此user 是插入mongodb后的值，包含_id
            user = result.ops[0];
            //将用户信息存入session
            delete user.userPwd;
            req.session.user = user;
            //写入flash
            req.flash('success', '注册成功');
            //跳转到首页
            res.redirect('/home');
        })
        .catch(function (e) {
            if (e.message.match('E11000 duplicate key')) {
                req.flash('error', e.message+'用户名已被占用');
                return res.redirect('/register');
            }
            next(e);
        });
});

module.exports = router;
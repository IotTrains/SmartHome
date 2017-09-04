const fs = require('fs');
const path = require('path');
const sha1 = require('sha1');
const express = require('express');
const router = express.Router();

const checkNotLogin = require('../middlewares/check').checkNotLogin;
const userModel = require('../models/users');

//const checkLogin = require('../middlewares/check').checkLogin;
router.post('/',checkNotLogin,function (req,res,next){
    let userName=req.body.username;
    let userPwd=req.body.password;
    let userRePwd=req.body.repassword;

    //加密密码
    userPwd = sha1(userPwd);
    let user = {
        userName: userName,
        userPwd: userPwd
    };
    //创建新用户
    userModel.create(user)
        .then(function (result) {
            //此user 是插入mongodb后的值，包含_id
            user = result.ops[0];
            //将用户信息存入session
            delete user.userPwd;
            //req.session.user = user;
            //写入flash
            //req.flash('success', '注册成功');
            //跳转到首页
            //res.redirect('#');
            //console.log(result);
            res.send(result);

        })
        .catch(next);
});

router.post('/check',checkNotLogin,function(req,res,next){
    let username=req.body.username;
    //console.log(username);
     userModel.getUserByName(username)
        .then(function (user) {
            //console.log(user.userName);
            if(!user){
                res.send({state:false});
            }else{
                //console.log(user.userName);
                res.send({state:true});
            }
        })
        .catch(next);
});


module.exports = router;
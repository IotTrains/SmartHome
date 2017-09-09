const fs = require('fs');
const path = require('path');
const sha1 = require('sha1');
const express = require('express');
const router = express.Router();

const checkNotLogin = require('../middlewares/check').checkNotLogin;
const userModel = require('../models/users');

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
            //req.session.user = user;
            delete user.userPwd;
            
            res.send(result);

        })
        .catch(next);
});

router.post('/check',checkNotLogin,function(req,res,next){
    let username=req.body.username;

     userModel.getUserByName(username)
        .then(function (user) {
          
            if(!user){
                res.send({state:false});
            }else{
                res.send({state:true});//用户名已被占用
            }
        })
        .catch(next);
});


module.exports = router;
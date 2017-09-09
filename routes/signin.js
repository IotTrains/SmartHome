const express = require('express'),
    sha1 = require('sha1'),
    router = express.Router(),
    UserModel = require('../models/users'),
    checkNotLogin = require('../middlewares/check').checkNotLogin;


//POST /login 用户登录
router.post('/', checkNotLogin, function (req, res, next) {
  
    var userName = req.body.name;
    var userPwd = req.body.pwd;
    var status=0;
    UserModel.getUserByName(userName)
        .then(function (user) {
            if (!user) {//用户不存在
                status=1;   
            }else if (sha1(userPwd) !== user.userPwd) {//密码不正确
                status=2;   
            }else{
                delete user.userPwd;
                req.session.user = user;
            }
            
            res.send({status:status});
        })
        .catch(next);
});

module.exports = router;
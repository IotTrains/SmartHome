const express = require('express'),
    sha1 = require('sha1'),
    router = express.Router(),
    UserModel = require('../models/users'),
    checkNotLogin = require('../middlewares/check').checkNotLogin;


//POST /login 用户登录
router.post('/', checkNotLogin, function (req, res, next) {
    //console.log(req.body);
    var userName = req.body.name;
    var userPwd = req.body.pwd;
    var status=0;
    //console.log(sha1(userPwd));
    UserModel.getUserByName(userName)
        .then(function (user) {
            if (!user) {//用户不存在
                status=1;
                //console.log(status);
            }else if (sha1(userPwd) !== user.userPwd) {//密码不正确
                status=2;
                //console.log(status);
            }else{
                delete user.userPwd;
                //console.log(status);
                req.session.user = user;
            }
            
            //检查密码是否匹配
            /*
            if (sha1(userPwd) !== user.userPwd) {
                status=2;
                //return res.redirect('back');
            }
            */
            
            //delete user.userPwd;
           // req.session.user = user;
            res.send({status:status});
            //res.redirect('/home');
        })
        .catch(next);
});

module.exports = router;
const express = require('express'),
    router = express.Router(),
    UserModel = require('../models/users'),
    checkNotLogin = require('../middlewares/check').checkNotLogin;
    checkLogin = require('../middlewares/check').checkLogin;

//GET /login 登录页
router.get('/', checkNotLogin, function (req, res, next) {
    res.render('nav');
});
router.get('/getInfo', checkLogin, function (req, res, next) {
    const name = req.session.user.userName; //get不能用req.body?
    UserModel.getUserByName(name)
        .then(function (user) {
            if (!user) {
                // req.flash('error','用户信息不存在，请填写并保存');
            }else {
                var resJSON = {
                    code: 0,
                    errMsg: '',
                    data: {
                        userName: user.userName
                    }
                };
            }
            res.send(resJSON);
        })

});

module.exports = router;
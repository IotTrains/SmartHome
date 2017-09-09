const express = require('express');
const router = express.Router();

router.get('/',function (req, res, next) {
    //清空session中的用户信息
    req.session.user = null;
    //req.flash('success', '登出成功');
    //return res.redirect('back');
    res.send(req.session.user);

});

module.exports = router;
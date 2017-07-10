const express = require('express');
const router = express.Router();
const CommentsModel = require('../models/Comments');
const checkLogin = require('../middlewares/check').checkLogin;

router.get('/', checkLogin, function (req, res, next) {
    res.render('myComment');
});
router.get('/getInfo', checkLogin, function (req, res, next) {
    var uid = req.session.user._id;
    CommentsModel.getCommentsByUid(uid)
        .then(function (comments) {
            if (!comments) {
                throw new Error('用户不存在任何联系人')
            }else {
                // var len = comments.length;
                // var arr = [];
                // for (var i=0; i<len; i++){
                //     var comment = {
                //         name: comments[i].name,
                //         title:comments[i].title,
                //         content: comments[i].content,
                //     }
                //     arr.push(comment);
                // }
                var resJSON = {
                    code: 0,
                    errMsg: '',
                    data: comments
                };
                res.send(resJSON);
            }
        });

});
//新建接口
router.post('/create', checkLogin, function (req, res, next) {
    const comment = {
        uid: req.session.user._id,
        name: req.body.name,
        title: req.body.title,
        content: req.body.content
    };
    CommentsModel.create(comment);
    const resJSON = {
        code: 0,
        content: '新建成功'
    };
    res.send(resJSON);

});
module.exports = router;
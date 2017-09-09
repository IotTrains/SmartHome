const express = require('express');
const router = express.Router();
const CommentsModel = require('../models/Comments');
const checkLogin = require('../middlewares/check').checkLogin;

router.get('/', checkLogin, function (req, res, next) {
    res.render('myComment');
});
router.get('/getInfo',checkLogin,function(req,res,next){
    CommentsModel.getComments()
        .then(function (comments){
            var resJSON={
                code: 0,
                errMsg:'',
                data: comments
            };
            res.send(resJSON);
        });
});
//新建接口
router.post('/create', checkLogin, function (req, res, next)  {
    
    const comment = {
        uid: req.session.user._id,
        author: req.session.user.userName,
        title: req.body.title,
        content: req.body.content
    };
    //console.log(comment.author)
    CommentsModel.create(comment);
    const resJSON = {
        code: 0,
        content: '新建成功'
    };
    res.send(resJSON);

});
module.exports = router;
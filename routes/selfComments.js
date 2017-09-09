const express = require('express');
const router = express.Router();
const CommentsModel = require('../models/Comments');
const checkLogin = require('../middlewares/check').checkLogin; 

router.get('/', checkLogin,function (req, res, next) {
    res.render('selfComments');
});
router.get('/getInfo', checkLogin, function (req, res, next) {
    var uid = req.session.user._id;
    CommentsModel.getCommentsByUid(uid)
        .then(function (comments) {
            var resJSON = {
                code: 0,
                errMsg: '',
                data: comments
            };
            res.send(resJSON);
        });

});

router.post('/deleteInfo',checkLogin,function(req,res,next){
    var comment_id=req.body.comment_id;
    CommentsModel.deleteCommentById(comment_id)
        .then(function (data){
            res.send(data.result);
        });
});

module.exports = router;
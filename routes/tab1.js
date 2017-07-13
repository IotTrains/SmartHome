const express = require('express');
const router = express.Router();
//route层引用了model层
const BasicInfoModel = require('../models/BasicInfo');
const checkLogin = require('../middlewares/check').checkLogin;
//进入目录时进行渲染
router.get('/', function (req, res, next) {
    res.render('tab1');
});
//查询接口
router.get('/getInfo', checkLogin, function (req, res, next) {
    const uid = req.session.user._id;
    BasicInfoModel.getBasicInfoByUid(uid)
        .then(function (basicInfo) {
            if (!basicInfo) {
                // req.flash('error','用户信息不存在，请填写并保存');
            }else {
                var resJSON = {
                    code: 0,
                    errMsg: '',
                    data: {
                        id: basicInfo.id,
                        className: basicInfo.className,
                        name: basicInfo.name,
                        groupName: basicInfo.groupName
                    }
                };
            }
            res.send(resJSON);
        })
});
//新建接口
router.post('/create', checkLogin, function (req, res, next) {
    const basicInfo = {
        uid: req.session.user._id,
        id: req.body.id,
        className: req.body.className,
        name: req.body.name,
        groupName: req.body.groupName
    };
    BasicInfoModel.create(basicInfo);
    const resJSON = {
        code: 0,
        content: '新建成功'
    };
    res.send(resJSON);

});
//更新接口
router.post('/update', checkLogin, function (req, res, next) {
    const uid = req.session.user._id;
    const basicInfo = {
        id: req.body.id,
        className: req.body.className,
        name: req.body.name,
        groupName: req.body.groupName
    };
    BasicInfoModel.updateBasicInfoByUid(uid, basicInfo);
    const resJSON = {
        code: 0,
        content: '更新成功'
    };
    res.send(resJSON);
});
module.exports = router;
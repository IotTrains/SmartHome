const BasicInfo = require('../lib/mongo').BasicInfo;

module.exports = {
    //新建基本信息
    create: function create(basicInfo) {
        return BasicInfo.create(basicInfo).exec();
    },
    //获取基本信息
    getBasicInfoByUid: function getBasicInfoByUid(uid) {
        return BasicInfo
            .findOne({ uid: uid})
            .populate({ path: 'uid', model: 'User'})
            .exec();

    },
    //更新基本信息
    updateBasicInfoByUid: function updateBasicInfoByUid(uid, data) {
        return BasicInfo.update({uid: uid}, {$set: data}).exec();
    }
};
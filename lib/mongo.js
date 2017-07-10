const config = require('config-lite')(__dirname);
const Mongolass = require('mongolass');
const mongolass = new Mongolass();
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
//连接数据库
mongolass.connect(config.mongodb);

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
    afterFind: function (results) {
        results.forEach(function (item) {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
        });
        return results;
    },
    afterFindOne: function (result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});
//用户注册表
exports.User = mongolass.model('User', {
    userName: { type: 'string' },
    userPwd: { type: 'string' }
});
exports.User.index({ userName: 1 },{ unique: true }).exec();// 根据用户名找到用户，用户名全局唯一
//用户基本信息表
exports.BasicInfo = mongolass.model('BasicInfo',{
    //系统ID
    uid: { type: Mongolass.Types.ObjectId},
    //学号
    id: { type: 'string'},
    //班级
    className: { type: 'string'},
    //姓名
    name: { type: 'string'},
    //小组名
    groupName: { type: 'string'},
});
exports.BasicInfo.index({ uid: 1}, {unique: true}).exec();
exports.Comments = mongolass.model('Comments', {
    uid: { type: Mongolass.Types.ObjectId},
    name: { type: 'string' },
    title: { type: 'string' },
    content: { type: 'string' }
});
exports.Comments.index({ uid: 1, _id: -1}).exec();
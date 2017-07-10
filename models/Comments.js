const Comments = require('../lib/mongo').Comments;

module.exports = {
    //新建心得体会(增)
    create: function create(comment) {
        return Comments.create(comment).exec();
    },
    //根据_id删除某条心得（删）
    deleteCommentById: function deleteCommentById(id) {
        return Comments.remove({_id: id}).exec();
    },
    //根据条件更新某条心得(改)
    updateCommentById: function updateCommentById(id, data) {
        return Comments.update({ _id: id}, { $set: data}).exec()
    },
    //获取用户全部心得(查)
    getCommentsByUid: function getCommentsByUid(uid) {
        return Comments.find({uid: uid}).exec();
    }
};
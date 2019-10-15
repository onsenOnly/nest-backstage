import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
    title: { type: String, index: true },
    source: { type: String },
    sourceAddress: { type: String },
    voiceSrc: { type: String },
    bannerSrc: { type: String },
    type: { type: Number, index: true }, // 1 一周推荐
    contentState: { type: mongoose.Schema.Types.Mixed },
    htmlContent: String,
    markdownContent: String,
    jsonContent: String,
    abstract: String,
    view: { type: Number, default: 0 },
    rView: { type: Number, default: 0 },
    like: { type: Number, default: 0 },
    rLike: { type: Number, default: 0 },
    createTime: { type: Date, default: Date.now() },
    updateTime: { type: Date }, // 发布的更改时间
    typeTime: { type: Date },  // 设置为type的时间
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }], // 分类
    status: { type: Number, default: 0 }, // 0发布 ， 1 草稿， 2删除
    appId: { type: mongoose.Schema.Types.ObjectId, ref: 'App' },
    commentNum: { type: Number, index: true, default: 0 }, // 留言通过条数
    // commentArr: [{ type: Schema.Types.ObjectId, ref: "Comment" }], // 评论
    // likeArr: [{ type: Schema.Types.ObjectId, ref: "User" }], // 收藏列表
});

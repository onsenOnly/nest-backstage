import * as mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
    commentUser: { type: mongoose.Schema.Types.ObjectId, ref: 'Consumer' },
    commentToUser: { type: mongoose.Schema.Types.ObjectId, ref: 'Consumer' },
    status: { type: String, default: 1 },
    createTime: { type: Date, default: new Date(), index: true },
    content: { type: String },
});

export const CommentSchema = new mongoose.Schema({
    commentBold: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    commentUser: { type: mongoose.Schema.Types.ObjectId, ref: 'Consumer' },
    status: { type: String, default: 1 },
    content: { type: String },
    createTime: { type: Date, default: new Date(), index: true },
    commentResponses: [replySchema],
});

import * as mongoose from 'mongoose';

export const BannerSchema = new mongoose.Schema({
    categoryName: String,
    fileName: String,
    tagUuid: { type: String, index: true },
    status: { type: String, default: 1 },
    createTime: { type: Date, default: Date.now() },
    updateTime: { type: Date },
    appId: { type: mongoose.Schema.Types.ObjectId, ref: 'App' }, // 分类
});

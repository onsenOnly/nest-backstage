import * as mongoose from 'mongoose';

export const UploadSchema = new mongoose.Schema({
    originalName: String,
    fileName: String,
    createTime: { type: Date, default: Date.now(), index: true },
    category: { type: String, default: 'upload' },
    tagUuid: { type: String, index: true },
    status: { type: Number, default: 0, index: true },
});

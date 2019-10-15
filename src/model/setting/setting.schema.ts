import * as mongoose from 'mongoose';

export const SettingSchema = new mongoose.Schema({
    itemName: String,
    itemAddress: String,
    createTime: { type: Date, default: Date.now() },
    updateTime: { type: Date },
});

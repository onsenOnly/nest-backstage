import * as mongoose from 'mongoose';

export const AppSchema = new mongoose.Schema({
    alias: { type: String, index: true },
    dec: String,
    secret: String,
    auth: [],
    createTime: { type: Date, default: new Date(), index: true },
    updateTime: { type: Date, default: new Date(), index: true },
});

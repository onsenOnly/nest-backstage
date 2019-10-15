import * as mongoose from 'mongoose';

const EnumRoleType = {
    ADMIN: 'admin',
    DEFAULT: 'guest',
    DEVELOPER: 'developer',
};

const watermarkSchema = new mongoose.Schema({
    openId: String,
    timestamp: String,
});

export const ConsumerSchema = new mongoose.Schema({
    openId: {
        type: String, unique: true, index: true,
    },
    nickName: String,
    gender: Number,
    language: String,
    city: String,
    province: String,
    country: String,
    avatarUrl: String,
    unionId: String,
    watermark: watermarkSchema,
    phone: String,
    session_key: String,
    token: {
        type: String, unique: true, index: true,
    },
    userType: {
        type: Number, default: 1,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    createAt: { type: Date, default: new Date() },
    updateAt: { type: Date },
});

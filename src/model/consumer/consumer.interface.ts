import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface Consumer extends Document {
    openId: string;
    nickName: string;
    gender: number;
    language: string;
    city: string;
    province: string;
    country: string;
    avatarUrl: string;
    unionId: string;
    watermark: object;
    phone: string;
    session_key: string;
    token: string;
    userType: number;
    // userName: string;
    password: string;
    email: string;
    createAt: Date;
    updateAt: Date;
}

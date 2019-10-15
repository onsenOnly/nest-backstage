import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface User extends Document {
    userName: string;
    password: string;
    permissions: string;
    avatar: string;
    createTime: Date;
    LastLoginTime: Date;
}

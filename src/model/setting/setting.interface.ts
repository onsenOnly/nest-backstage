import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface Setting extends Document {
    itemName: string;
    itemAddress: string;
    createTime: Date;
    updateTime: Date;
}

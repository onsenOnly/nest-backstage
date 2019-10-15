import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface Banner extends Document {
    categoryName: string;
    fileName: string;
    tagUuid: string;
    createTime: Date;
    updateTime: Date;
}

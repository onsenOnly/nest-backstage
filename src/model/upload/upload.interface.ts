import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface Upload extends Document {
    originalName: string;
    fileName: string;
    createTime: Date;
    category: string;
    tagUuid: string;
    status: number;
}

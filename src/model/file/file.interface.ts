import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface File extends Document {
    noteName: string;
    remoteName: string;
    fileName: string;
    tagUuid: string;
    createTime: Date;
    updateTime: Date;
}

import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface Comment extends Document {
    commentBold: object;
    commentUser: object;
    status: number;
    content: string;
    createTime: Date;
    commentResponses: [object];
}

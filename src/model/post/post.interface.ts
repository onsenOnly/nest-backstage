import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface PostInterface extends Document {
    title: string;
    category: [string];
    type: number;
    contentState: object;
    htmlContent: string;
    markdownContent: string;
    jsonContent: string;
    view: number;
    rView: number;
    like: number;
    rLike: number;
}

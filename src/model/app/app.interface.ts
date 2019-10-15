import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface App extends Document {
    readonly alias: string;
    readonly dec: string;
    readonly secret: string;
    readonly auth: [string];
}

import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface Permission extends Document {
    readonly visit: [string];
    readonly role: string;
}

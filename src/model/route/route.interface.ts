import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface Route extends Document {
    readonly id: string;
    readonly icon: string;
    readonly name: string;
    readonly route: string;
    readonly role: string;
    readonly zh: { readonly name: string };
    readonly 'pt-br': { readonly name: string };
}

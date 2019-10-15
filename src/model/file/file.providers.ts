import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { FileSchema } from './file.schema';

export const fileProviders = [
    {
        provide: 'FILE_MODEL',
        useFactory: (connection: Connection) => connection.model('File', FileSchema),
        inject: ['MONGODB_CONNECTION'],
    },
];

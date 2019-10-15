import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { UploadSchema } from './upload.schema';

export const uploadProviders = [
    {
        provide: 'UPLOAD_MODEL',
        useFactory: (connection: Connection) => connection.model('Upload', UploadSchema),
        inject: ['MONGODB_CONNECTION'],
    },
];

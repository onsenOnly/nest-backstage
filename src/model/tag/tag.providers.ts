import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { TagSchema } from './tag.schema';

export const tagProviders = [
    {
        provide: 'TAG_MODEL',
        useFactory: (connection: Connection) => connection.model('Tag', TagSchema),
        inject: ['MONGODB_CONNECTION'],
    },
];

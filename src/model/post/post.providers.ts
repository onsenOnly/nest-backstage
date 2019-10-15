import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { PostSchema } from './post.schema';

export const PostProviders = [
    {
        provide: 'POST_MODEL',
        useFactory: (connection: Connection) => connection.model('Post', PostSchema),
        inject: ['MONGODB_CONNECTION'],
    },
];

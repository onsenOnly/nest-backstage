import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { CatSchema } from '../../model/cats/cats.schema';

export const catsProviders = [
    {
        provide: 'CAT_MODEL',
        useFactory: (connection: Connection) => connection.model('Cat', CatSchema),
        inject: ['MONGODB_CONNECTION'],
    },
];

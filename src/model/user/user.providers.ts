import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { UserSchema } from './user.schema';
import { RouteSchema } from '../route/route.schenma';

export const userProviders = [
    {
        provide: 'USER_MODEL',
        useFactory: (connection: Connection) => connection.model('User', UserSchema),
        inject: ['MONGODB_CONNECTION'],
    },
];

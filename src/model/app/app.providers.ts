import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { AppSchema } from './app.schenma';

export const AppProviders = [
    {
        provide: 'APP_MODEL',
        useFactory: (connection: Connection) => connection.model('App', AppSchema),
        inject: ['MONGODB_CONNECTION'],
    },
];

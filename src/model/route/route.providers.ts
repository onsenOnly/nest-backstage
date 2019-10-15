import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { RouteSchema } from './route.schenma';

export const RouteProviders = [
    {
        provide: 'ROUTE_MODEL',
        useFactory: (connection: Connection) => connection.model('Route', RouteSchema),
        inject: ['MONGODB_CONNECTION'],
    },
];

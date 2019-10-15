import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { ConsumerSchema } from './consumer.schema';

export const consumerProviders = [
    {
        provide: 'CONSUMER_MODEL',
        useFactory: (connection: Connection) => connection.model('Consumer', ConsumerSchema),
        inject: ['MONGODB_CONNECTION'],
    },
];

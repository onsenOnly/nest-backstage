import * as mongoose from 'mongoose';
import { ConfigService } from '../config/config.service';

export const databaseProviders = [
    {
        provide: 'MONGODB_CONNECTION',
        useFactory: (config: ConfigService): Promise<typeof mongoose> => {
            console.info(config.mongo_url);
            return mongoose.connect(config.mongo_url);
        },
        inject: [ConfigService],
    },
];

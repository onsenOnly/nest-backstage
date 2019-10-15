import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { BannerSchema } from './banner.schema';

export const bannerProviders = [
    {
        provide: 'BANNER_MODEL',
        useFactory: (connection: Connection) => connection.model('Banner', BannerSchema),
        inject: ['MONGODB_CONNECTION'],
    },
];

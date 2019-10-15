import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { SettingSchema } from './setting.schema';

export const settingProviders = [
    {
        provide: 'SETTING_MODEL',
        useFactory: (connection: Connection) => connection.model('Setting', SettingSchema),
        inject: ['MONGODB_CONNECTION'],
    },
];

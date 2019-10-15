import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { PermissionSchema } from './permission.schema';

export const permissionProviders = [
    {
        provide: 'PERMISSION_MODEL',
        useFactory: (connection: Connection) => connection.model('Permission', PermissionSchema),
        inject: ['MONGODB_CONNECTION'],
    },
];

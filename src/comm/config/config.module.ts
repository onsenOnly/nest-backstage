import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import { databaseProviders } from '../database/database.providers';
/**
 *  官方：ConfigModule您可以将所有模块声明ConfigModule为全局模块，而不是导入所有模块。
 */
@Global()
@Module({
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService(`\\${process.env.NODE_ENV}.env`),
        },
        ...databaseProviders,
    ],
    exports: [ConfigService, ...databaseProviders],
})
export class ConfigModule { }

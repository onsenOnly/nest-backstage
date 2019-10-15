import { Module } from '@nestjs/common';
import { loggerProviders } from './logger.service';

@Module({
    providers: [...loggerProviders],
    exports: [...loggerProviders],
})
export class LoggerModule { }

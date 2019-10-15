import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppProviders } from '../../model/app/app.providers';

@Module({
    // imports: [ConfigModule],
    controllers: [AppController],
    providers: [AppService, ...AppProviders],
})
export class AppModule { }

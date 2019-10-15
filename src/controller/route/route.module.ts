import { Module } from '@nestjs/common';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';
import { RouteProviders } from '../../model/route/route.providers';

@Module({
    // imports: [ConfigModule],
    controllers: [RouteController],
    providers: [RouteService, ...RouteProviders],
})
export class RouteModule { }

import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    Res,
    UseInterceptors,
    UploadedFiles,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RouteService } from './route.service';
import { ConfigService } from '../../comm/config/config.service';
import { Request, Response } from 'express';
import { Route } from '../../model/route/route.interface';

@Controller('route')
export class RouteController {
    constructor(private readonly configService: ConfigService, private readonly routeService: RouteService) { }
    @Get()
    async queryPermissionRoutes(@Res() res: Response) {
        const routeList = await this.routeService.queryRouteList();
        return { list: routeList };
    }
}

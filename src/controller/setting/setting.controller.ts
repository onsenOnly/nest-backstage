import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    Res,
    UseInterceptors,
    Delete,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { SettingService } from './setting.service';
import { CreateSettingDto } from '../../model/setting/setting.dto';
import { Setting } from '../../model/setting/setting.interface';
import { Route } from '../../model/route/route.interface';
import { ConfigService } from '../../comm/config/config.service';
import { ErrorsInterceptor } from '../../comm/interceptors/exception.interceptor';
import { TransformInterceptor } from '../../comm/interceptors/transform.interceptor';
import { Request, Response } from 'express';
import { getLogger } from 'log4js';
import * as qs from 'qs';

@Controller('setting')
export class SettingController {
    constructor(private readonly configService: ConfigService, private readonly settingService: SettingService) { }
    @Get()
    async querySettingList(@Req() req: Request, @Res() res: Response) {
        const page = req.body && req.query.page ? req.query.page : 1;
        const pageSize = req.body && req.query.pageSize ? req.query.pageSize : 10;
        return { list: await this.settingService.querySettingList(page, pageSize) };
    }
    @Post()
    async createSetting(@Body() createSettingDto: CreateSettingDto, @Res() res: Response) {
        await this.settingService.create(createSettingDto);
        return 200;
    }
    @Post('/update')
    async updateSetting(@Req() req: Request, @Res() res: Response) {
        if (!req.body.id || !req.body.itemName || !req.body.itemAddress) {
            throw new HttpException('Params is incomplete', HttpStatus.PAYMENT_REQUIRED);
        }
        const data = {
            itemName: req.body.itemName,
            itemAddress: req.body.itemAddress,
        };
        await this.settingService.updateById(req.body.id, data);
        return 200;
    }
    @Delete()
    async removeSetting(@Req() req: Request, @Res() res: Response) {
        if (!req.body.id) {
            throw new HttpException('New message', HttpStatus.BAD_GATEWAY);
        }
        await this.settingService.removeById(req.body.id);
        return 200;
    }
    @Delete('/delete')
    async removeTagsSetting(@Res() res: Response) {
        // const routeList = await this.permissionService.queryRouteList();
        // return { list: routeList };
    }
}

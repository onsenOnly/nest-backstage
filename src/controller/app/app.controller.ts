import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Delete,
    Req,
    Res,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '../../comm/config/config.service';
import { Request, Response } from 'express';
import { App } from '../../model/app/app.interface';
import { CreateAppDto } from '../../model/app/app.dto';

/**
 * 错误业务码：
 * 102001：alias reuse 别名重用了
 */

@Controller('app')
export class AppController {
    constructor(private readonly configService: ConfigService, private readonly appService: AppService) { }

    /**
     * 查询app应用列表
     * @param req
     * @param res
     */
    @Get()
    async queryAppConfigList(@Req() req: Request, @Res() res: Response) {
        const page = req.body && req.query.page ? req.query.page : 1;
        const pageSize = req.body && req.query.pageSize ? req.query.pageSize : 10;
        return { list: await this.appService.queryAppConfigList(page, pageSize), tatol: await this.appService.queryAppConfigCount() };
    }

    /**
     * 创建应用
     * @param req
     * @param res
     */
    @Post()
    async createAppConfig(@Body() createAppDto: CreateAppDto, @Res() res: Response) {
        const appConfig = await this.appService.AppConfingFindOne({ alias: createAppDto.alias });
        console.info(appConfig);
        if (appConfig) {
            return { code: 102001, msg: 'alias reuse' };
        }
        await this.appService.createAppConfig(createAppDto);
        return 200;
    }
    @Post('/update')
    async updateAppConfig(@Req() req: Request, @Res() res: Response) {
        if (!req.body || !req.body.id || !req.body.alias || !req.body.dec) {
            throw new HttpException('Params is incomplete', HttpStatus.PAYMENT_REQUIRED);
        }
        const data = {
            alias: req.body.alias,
            dec: req.body.dec,
        };
        await this.appService.updateById(req.body.id, data);
        return 200;
    }
    @Delete('/:id')
    async removeAppConfig(@Req() req: Request, @Res() res: Response) {
        if (!req.params.id) {
            throw new HttpException('New message', HttpStatus.BAD_GATEWAY);
        }
        await this.appService.removeOneById({ _id: req.params.id });
        return 200;
    }

    @Post('/delete')
    async removeAppConfigList(@Req() req: Request, @Res() res: Response) {
        if (!req.body.ids || req.body.ids.length === 0) {
            throw new HttpException('New message', HttpStatus.BAD_GATEWAY);
        }
        await this.appService.removeManyById({ _id: { $in: req.body.ids } });
        return 200;
    }

    @Get('/all')
    async queryAllAppConfig(@Req() req: Request, @Res() res: Response) {
        return { list: await this.appService.queryAllAppConfig() };
    }
}

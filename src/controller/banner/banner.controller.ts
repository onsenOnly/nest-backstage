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
import { BannerService } from './banner.service';
import { CreateBannerDto } from '../../model/banner/banner.dto';
import { Banner } from '../../model/banner/banner.interface';
import { Route } from '../../model/route/route.interface';
import { ConfigService } from '../../comm/config/config.service';
import { ErrorsInterceptor } from '../../comm/interceptors/exception.interceptor';
import { TransformInterceptor } from '../../comm/interceptors/transform.interceptor';
import { Request, Response } from 'express';
import { getLogger } from 'log4js';
import * as qs from 'qs';

/**
 * 错误业务码：
 * 104001：alias reuse 别名重用了
 */
@Controller('banner')
export class BannerController {
    constructor(private readonly configService: ConfigService, private readonly bannerService: BannerService) { }
    @Get()
    async queryBannerList(@Req() req: Request, @Res() res: Response) {
        const page = req.query && req.query.page ? req.query.page : 1;
        const pageSize = req.query && req.query.pageSize ? req.query.pageSize : 10;
        const { name, createTime, status } = req.query;
        const condition = {
            name,
            appId: status,
        };
        if (createTime && createTime.length !== 0) {
            condition['$and'] = [{ createTime: { $gt: createTime[0] } }, { createTime: { $lt: createTime[1] } }];
        }
        return { list: await this.bannerService.queryTagList(condition, page, pageSize) };
    }
    @Post()
    async createTag(@Body() createBannerDto: CreateBannerDto, @Res() res: Response) {
        const bannerData = await this.bannerService.findOneByName(createBannerDto.categoryName);
        if (bannerData) {
            return { code: 104001, msg: 'alias reuse' };
        }
        await this.bannerService.create(createBannerDto);
        return 200;
    }
    @Post('/update')
    async updateTag(@Req() req: Request, @Res() res: Response) {
        if (!req.body.id || !req.body.categoryName || !req.body.tagUuid || !req.body.fileName) {
            throw new HttpException('Params is incomplete', HttpStatus.PAYMENT_REQUIRED);
        }
        const data = {
            categoryName: req.body.categoryName,
            fileName: req.body.fileName,
            tagUuid: req.body.tagUuid,
        };
        await this.bannerService.updateById(req.body.id, data);
        return 200;
    }
    @Delete('')
    async removeTag(@Req() req: Request, @Res() res: Response) {
        console.info(req.body);
        if (!req.body.id) {
            throw new HttpException('New message', HttpStatus.BAD_GATEWAY);
        }
        await this.bannerService.removeById(req.body.id);
        return 200;
    }
    @Delete('/delete')
    async removeTagsList(@Req() req: Request, @Res() res: Response) {
        const { ids } = req.body;
        if (!ids || ids.length === 0) {
            throw new HttpException('New message', HttpStatus.BAD_GATEWAY);
        }
        const bannerArr = await this.bannerService.findById(ids);
        const tagUuidArr = [];
        bannerArr.forEach(item => {
            tagUuidArr.push(item.tagUuid);
        });
        await this.bannerService.removeManyById(tagUuidArr, ids);
        return 200;
    }
}

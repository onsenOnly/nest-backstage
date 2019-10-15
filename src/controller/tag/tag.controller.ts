import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    Delete,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from '../../model/tag/tag.dto';
import { ConfigService } from '../../comm/config/config.service';
import { Request, Response } from 'express';

/**
 * 错误业务码：
 * 103001：alias reuse 别名重用了
 */
@Controller('tag')
export class TagController {
    constructor(private readonly configService: ConfigService, private readonly tagService: TagService) { }
    @Get()
    async queryTagsList(@Req() req: Request, @Res() res: Response) {
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
        return { list: await this.tagService.queryTagList(condition, page, pageSize) };
    }
    @Get('/all')
    async queryAllTags(@Req() req: Request, @Res() res: Response) {
        return { list: await this.tagService.queryAllTags() };
    }
    @Post()
    async createTag(@Body() createTagDto: CreateTagDto, @Res() res: Response) {
        const tagData = await this.tagService.findOneByName(createTagDto.categoryName);
        if (tagData) {
            return { code: 103001, msg: 'alias reuse' };
        }
        await this.tagService.create(createTagDto);
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
        await this.tagService.updateById(req.body.id, data);
        return 200;
    }
    @Delete()
    async removeTag(@Req() req: Request, @Res() res: Response) {
        if (!req.body.id) {
            throw new HttpException('New message', HttpStatus.BAD_GATEWAY);
        }
        await this.tagService.removeById(req.body.id);
        return 200;
    }
    @Delete('/delete')
    async removeTagsList(@Res() res: Response) {
        // const routeList = await this.permissionService.queryRouteList();
        // return { list: routeList };
    }
}

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
import { FileService } from './file.service';
import { CreateFileDto } from '../../model/file/file.dto';
import { File } from '../../model/file/file.interface';
import { Route } from '../../model/route/route.interface';
import { ConfigService } from '../../comm/config/config.service';
import { ErrorsInterceptor } from '../../comm/interceptors/exception.interceptor';
import { TransformInterceptor } from '../../comm/interceptors/transform.interceptor';
import { Request, Response } from 'express';
import { getLogger } from 'log4js';
import * as qs from 'qs';

/**
 * 错误业务码：
 * 105001：alias reuse 别名重用了
 */
@Controller('file')
export class FileController {
    constructor(private readonly configService: ConfigService, private readonly fileService: FileService) { }
    @Get()
    async queryFileList(@Req() req: Request, @Res() res: Response) {
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
        return { list: await this.fileService.queryFileList(condition, page, pageSize) };
    }
    @Post()
    async createFile(@Req() req: Request, @Res() res: Response) {
        const { remoteName, noteName, tagUuid, appId } = req.body;
        let { fileName } = req.body;
        if (!noteName || !tagUuid || !appId) {
            throw new HttpException('Params is incomplete', HttpStatus.PAYMENT_REQUIRED);
        }
        console.info(!remoteName);
        console.info(!fileName);
        console.info(!remoteName && !fileName);
        if (!remoteName && !fileName) {
            throw new HttpException('Params is incomplete', HttpStatus.PAYMENT_REQUIRED);
        }
        const fileData = await this.fileService.findOneByName(noteName);
        if (fileData) {
            return { code: 105001, msg: 'alias reuse' };
        }
        if (remoteName) {
            fileName = undefined;
        }
        await this.fileService.create({
            remoteName,
            noteName,
            fileName,
            tagUuid,
            appId,
        });
        return 200;
    }
    @Post('/update')
    async updateFile(@Req() req: Request, @Res() res: Response) {
        const { remoteName, noteName, tagUuid, appId } = req.body;
        let { fileName } = req.body;
        if (!noteName || !tagUuid || !appId) {
            throw new HttpException('Params is incomplete', HttpStatus.PAYMENT_REQUIRED);
        }
        if (!remoteName && !fileName) {
            throw new HttpException('Params is incomplete', HttpStatus.PAYMENT_REQUIRED);
        }
        if (remoteName) {
            fileName = undefined;
        }
        const data = {
            remoteName,
            noteName,
            fileName,
            tagUuid,
            appId,
        };
        await this.fileService.updateById(req.body.id, data);
        return 200;
    }
    @Delete()
    async remove(@Req() req: Request, @Res() res: Response) {
        if (!req.body.id) {
            throw new HttpException('New message', HttpStatus.BAD_GATEWAY);
        }
        await this.fileService.removeById(req.body.id);
        return 200;
    }
    @Delete('/delete')
    async removeFileList(@Req() req: Request, @Res() res: Response) {
        const { ids } = req.body;
        if (!ids || ids.length === 0) {
            throw new HttpException('New message', HttpStatus.BAD_GATEWAY);
        }
        const fileArr = await this.fileService.findById(ids);
        const fileNameIdArr = [];
        fileArr.forEach(item => {
            if (item.fileName) {
                fileNameIdArr.push(item.tagUuid);
            }
        });
        await this.fileService.removeManyById(fileNameIdArr, ids);
        return 200;
    }
}

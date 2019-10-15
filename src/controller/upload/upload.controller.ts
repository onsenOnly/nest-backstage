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
import { UploadService } from './upload.service';
import { ConfigService } from '../../comm/config/config.service';
import { ErrorsInterceptor } from '../../comm/interceptors/exception.interceptor';
import { TransformInterceptor } from '../../comm/interceptors/transform.interceptor';
import { Request, Response } from 'express';
import * as qs from 'qs';
import * as bcrypt from 'bcrypt';
import { getLogger } from 'log4js';
import * as fs from 'fs';
import * as moment from 'moment';
import { uploadDir } from '../../../public/uploadDir';

@Controller('upload')
export class UploadController {
    constructor(private readonly configService: ConfigService, private readonly uploadService: UploadService) { }
    @Post('/:tag')
    @UseInterceptors(FilesInterceptor('file'))
    async uploadPic(@UploadedFiles() files, @Req() req: Request, @Res() res: Response) {
        if (files.length === 0) {
            return { msg: 'files length is 0' };
        }
        if (!req.params.tag || !req.query.tagUuid) {
            throw new HttpException('Params is incomplete', HttpStatus.PAYMENT_REQUIRED);
        }
        const tag = req.params.tag;
        const uuid = req.query.tagUuid;
        const sourceList = [];
        const dbDataList = [];
        for (const file of files) {
            let suffix;
            if (file.mimetype.indexOf('image') > -1) {
                suffix = '.png';
            } else {
                suffix = '.txt';
            }
            const date = moment(Date.now()).format('_YYYYMMDDHHmmss');
            const picName = `${file.size}${date}${suffix}`; // 暂时默认覆盖和.png
            const writeData = fs.writeFileSync(`${uploadDir}\\${tag}\\${picName}`, file.buffer);
            dbDataList.push({
                originalName: file.originalname,
                fileName: picName,
                category: tag,
                tagUuid: uuid,
            });
            sourceList.push(`\/${tag}\/${picName}`);
        }
        await this.uploadService.insertManyData(dbDataList);
        return { list: sourceList };
    }

    @Get('/:tag')
    async uploadPic2(@Req() req: Request, @Res() res: Response) {
        console.info(req.params.tag);
        return 200;
    }
}

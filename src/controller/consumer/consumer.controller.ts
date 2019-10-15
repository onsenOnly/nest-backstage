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
import { ConsumerService } from './consumer.service';
import { CreatePermissionDto } from '../../model/permission/permission.dto';
import { ConfigService } from '../../comm/config/config.service';
import { Request, Response } from 'express';
import { Consumer } from '../../model/consumer/consumer.interface';

@Controller('consumer')
export class ConsumerController {
    constructor(private readonly configService: ConfigService, private readonly consumerService: ConsumerService) { }
    @Get()
    async queryConsumerList(@Req() req: Request, @Res() res: Response) {
        const page = req.body && req.query.page ? req.query.page : 1;
        const pageSize = req.body && req.query.pageSize ? req.query.pageSize : 10;
        return { list: await this.consumerService.queryConsumerList(page, pageSize) };
    }

    @Get('/:id')
    async queryConsumerOne(@Req() req: Request, @Res() res: Response) {
        if (!req.params.id) {
            throw new HttpException('New message', HttpStatus.BAD_GATEWAY);
        }
        return { consumer: await this.consumerService.queryConsumerOne({ _id: req.params.id }) };
    }
}

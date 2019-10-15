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
import { CommentService } from './comment.service';
import { ConfigService } from '../../comm/config/config.service';
import { Request, Response } from 'express';
import { Comment } from '../../model/comment/comment.interface';

@Controller('comment')
export class CommentController {
    constructor(private readonly configService: ConfigService, private readonly commentService: CommentService) { }
    @Get()
    async queryCommentList(@Req() req: Request, @Res() res: Response) {
        const page = req.body && req.query.page ? req.query.page : 1;
        const pageSize = req.body && req.query.pageSize ? req.query.pageSize : 10;
        return { list: await this.commentService.queryConsumerList(page, pageSize) };
    }

    @Get('/:id')
    async queryCommentOne(@Req() req: Request, @Res() res: Response) {
        if (!req.params.id) {
            throw new HttpException('New message', HttpStatus.BAD_GATEWAY);
        }
        return { consumer: await this.commentService.queryConsumerOne({ _id: req.params.id }) };
    }
}

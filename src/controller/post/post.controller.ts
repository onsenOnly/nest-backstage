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
import { PostService } from './post.service';
import { ConfigService } from '../../comm/config/config.service';
import { Request, Response } from 'express';
import { PostInterface } from '../../model/post/post.interface';
import { Tag } from '../../model/tag/tag.interface';

@Controller('post')
export class PostController {
    constructor(private readonly configService: ConfigService, private readonly postService: PostService) { }
    @Post('/publish')
    async postPublish(@Req() req: Request, @Res() res: Response) {
        if (!req.body.title ||
            !req.body.category ||
            // !req.body.contentState ||
            !req.body.htmlContent ||
            !req.body.markdownContent ||
            // !req.body.jsonContent ||
            !req.body.type) {
            throw new HttpException('Params is incomplete', HttpStatus.PAYMENT_REQUIRED);
        }
        console.info(req.body.htmlContent);
        if (req.body.id) {
            await this.postService.updatePost({ _id: req.body.id }, {
                title: req.body.title,
                abstract: req.body.abstract,
                bannerSrc: req.body.bannerUrl,
                source: req.body.source,
                sourceAddress: req.body.sourceAddress,
                voiceSrc: req.body.voiceUrl,
                category: req.body.category,
                htmlContent: req.body.htmlContent,
                // contentState: req.body.contentState,
                // jsonContent: req.body.jsonContent,
                markdownContent: req.body.markdownContent,
                typeTime: req.body.isRecommend === 1 ? new Date() : undefined,
                type: req.body.isRecommend === 1 ? 1 : undefined,
                status: req.body.type,
            });
            return 200;
        }
        await this.postService.createPost({
            title: req.body.title,
            abstract: req.body.abstract,
            bannerSrc: req.body.bannerUrl,
            source: req.body.source,
            sourceAddress: req.body.sourceAddress,
            voiceSrc: req.body.voiceUrl,
            category: req.body.category,
            htmlContent: req.body.htmlContent,
            // contentState: req.body.contentState,
            // jsonContent: req.body.jsonContent,
            markdownContent: req.body.markdownContent,
            typeTime: req.body.isRecommend === 1 ? new Date() : undefined,
            type: req.body.isRecommend === 1 ? 1 : undefined,
            status: req.body.type,
            appId: req.body.appId,
        });
        return 200;
    }
    @Get('/:id')
    async queryPost(@Req() req: Request, @Res() res: Response) {
        const postId = req.params.id;
        const appId = req.query.status;
        if (!appId || !postId) {
            throw new HttpException('Params is incomplete', HttpStatus.PAYMENT_REQUIRED);
        }
        const tagArr = await this.postService.getAllTags(appId);
        const thePost = await this.postService.postFindOne(postId);
        return { tagList: tagArr, postData: thePost };
    }
    @Get()
    async getPost(@Req() req: Request, @Res() res: Response) {
        const page = req.query && req.query.page ? req.query.page : 1;
        const pageSize = req.query && req.query.pageSize ? req.query.pageSize : 10;
        const { name, createTime, status } = req.query;
        const condition = {
            name,
            appId: status,
            // isDelete: 0,
        };
        if (createTime && createTime.length !== 0) {
            condition['$and'] = [{ createTime: { $gt: createTime[0] } }, { createTime: { $lt: createTime[1] } }];
        }
        const countCondition = {
            appId: req.query.status,
        };
        const count = await this.postService.getPostCount(countCondition);
        return { total: count, list: await this.postService.queryPostList(condition, page, pageSize, req.query.status) };
    }
}

import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { PostInterface } from '../../model/post/post.interface';
import { Tag } from '../../model/tag/tag.interface';

@Injectable()
export class PostService {
    constructor(
        @Inject('POST_MODEL')
        private readonly postModel: Model<PostInterface>,
        @Inject('TAG_MODEL')
        private readonly tagModel: Model<Tag>,
    ) { }

    async createPost(data): Promise<PostInterface> {
        return await this.postModel.create(data);
    }

    async updatePost(condition, values): Promise<PostInterface> {
        return await this.postModel.updateOne(condition, { $set: values });
    }

    async queryPostList(condition, page, pageSize, status): Promise<PostInterface[]> {
        return await this.postModel.find(condition,
            { isDelete: false, contentState: false, htmlContent: false, markdownContent: false, jsonContent: false })
            .populate({ path: 'category', select: 'categoryName' })
            .sort({ createTime: 1 })
            .skip((page - 1) * pageSize)
            .limit(Number(pageSize));
    }

    async getPostCount(condition): Promise<number> {
        return await this.postModel.count(condition);
    }

    async getAllTags(appId): Promise<Tag[]> {
        return await this.tagModel.find({ appId });
    }

    async postFindOne(postId): Promise<PostInterface> {
        return await this.postModel.findOne({ _id: postId }).populate({ path: 'category', select: 'categoryName' });
    }
}

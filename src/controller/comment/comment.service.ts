import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Comment } from '../../model/comment/comment.interface';

@Injectable()
export class CommentService {
    constructor(
        @Inject('COMMENT_MODEL')
        private readonly commentModel: Model<Comment>,
    ) { }
    async queryConsumerList(page, pageSize): Promise<Comment[]> {
        return await this.commentModel.find({})
            .sort({ createTime: 1 })
            .skip((page - 1) * pageSize)
            .limit(Number(pageSize));
    }

    async queryConsumerOne(condition): Promise<Comment> {
        return await this.commentModel.findOne(condition);
    }
}

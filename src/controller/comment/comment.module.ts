import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { commentProviders } from '../../model/comment/comment.providers';

@Module({
    // imports: [ConfigModule],
    controllers: [CommentController],
    providers: [CommentService, ...commentProviders],
})
export class CommentModule { }

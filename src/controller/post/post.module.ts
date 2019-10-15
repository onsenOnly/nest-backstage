import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostProviders } from '../../model/post/post.providers';
import { tagProviders } from '../../model/tag/tag.providers';

@Module({
    // imports: [ConfigModule],
    controllers: [PostController],
    providers: [PostService, ...PostProviders, ...tagProviders],
})
export class PostModule { }

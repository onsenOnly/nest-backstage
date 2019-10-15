import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { tagProviders } from '../../model/tag/tag.providers';
import { uploadProviders } from '../../model/upload/upload.providers';

@Module({
    // imports: [ConfigModule],
    controllers: [TagController],
    providers: [TagService, ...tagProviders, ...uploadProviders],
})
export class TagModule { }

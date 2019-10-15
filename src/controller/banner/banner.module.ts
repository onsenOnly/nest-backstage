import { Module } from '@nestjs/common';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';
import { bannerProviders } from '../../model/banner/banner.providers';
import { uploadProviders } from '../../model/upload/upload.providers';

@Module({
    // imports: [ConfigModule],
    controllers: [BannerController],
    providers: [BannerService, ...bannerProviders, ...uploadProviders],
})
export class BannerModule { }

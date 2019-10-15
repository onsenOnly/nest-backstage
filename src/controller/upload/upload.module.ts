import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { uploadProviders } from '../../model/upload/upload.providers';

@Module({
    // imports: [ConfigModule],
    controllers: [UploadController],
    providers: [UploadService, ...uploadProviders],
})
export class UploadModule { }

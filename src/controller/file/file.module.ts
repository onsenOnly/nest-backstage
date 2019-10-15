import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { fileProviders } from '../../model/file/file.providers';
import { uploadProviders } from '../../model/upload/upload.providers';

@Module({
    // imports: [ConfigModule],
    controllers: [FileController],
    providers: [FileService, ...fileProviders, ...uploadProviders],
})
export class FileModule { }

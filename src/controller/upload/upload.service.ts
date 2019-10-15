import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Upload } from '../../model/upload/upload.interface';
import { ConfigService } from '../../comm/config/config.service';
import { Logger } from 'log4js';
import * as fs from 'fs';

@Injectable()
export class UploadService {
    constructor(
        @Inject('UPLOAD_MODEL')
        private readonly uploadModel: Model<Upload>,
    ) { }
    async insertManyData(DataArr) {
        await this.uploadModel.insertMany(DataArr);
    }
}

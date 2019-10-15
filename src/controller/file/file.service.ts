import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { File } from '../../model/file/file.interface';
import { Upload } from '../../model/upload/upload.interface';
// import { Route } from '../../model/permission/route.interface';
import { CreateFileDto } from '../../model/file/file.dto';
import { ConfigService } from '../../comm/config/config.service';
import { Logger } from 'log4js';

@Injectable()
export class FileService {
    constructor(
        @Inject('FILE_MODEL')
        private readonly fileModel: Model<File>,
        @Inject('UPLOAD_MODEL')
        private readonly uploadModel: Model<Upload>,
    ) { }
    async findById(ids: string): Promise<File[]> {
        return await this.fileModel.find({ _id: { $in: ids } });
    }

    async findOneByName(name: string): Promise<File> {
        return await this.fileModel.findOne({ noteName: name });
    }

    async create(fileDto) {
        await this.fileModel.create(fileDto);
        if (fileDto.fileName) {
            const theFileName = fileDto.fileName.substring(fileDto.fileName.lastIndexOf('/') + 1, fileDto.fileName.length);
            await this.uploadModel.updateMany({ tagUuid: fileDto.tagUuid, fileName: theFileName }, { $set: { status: 1 } });
        }
    }

    async queryFileList(condition, page, pageSize): Promise<File[]> {
        return await this.fileModel.find(condition).skip((page - 1) * pageSize).limit(Number(pageSize));
    }

    async removeById(id) {
        const removeData = await this.fileModel.findByIdAndDelete({ _id: id });
        if (removeData.fileName) {
            const theFileName = removeData.fileName.substring(removeData.fileName.lastIndexOf('/') + 1, removeData.fileName.length);
            await this.uploadModel.updateMany({ tagUuid: removeData.tagUuid, fileName: theFileName }, { $set: { status: 0 } });
        }
    }

    async updateById(id, data) {
        data.updateTime = new Date();
        const oldData = await this.fileModel.findByIdAndUpdate({ _id: id }, { $set: data });
        if (data.fileName) {
            let theFileName = data.fileName.substring(data.fileName.lastIndexOf('/') + 1, data.fileName.length);
            await this.uploadModel.updateMany({ tagUuid: data.tagUuid, fileName: theFileName }, { $set: { status: 1 } });
            theFileName = oldData.fileName.substring(oldData.fileName.lastIndexOf('/') + 1, oldData.fileName.length);
            await this.uploadModel.updateMany({ tagUuid: oldData.tagUuid, fileName: theFileName }, { $set: { status: 0 } });
        }
    }

    async removeManyById(fileNameIdArr, allIdArr) {
        await this.fileModel.deleteMany({ _id: { $in: allIdArr } });
        if (fileNameIdArr.length > 0) {
            await this.uploadModel.updateMany({ tagUuid: { $in: fileNameIdArr } }, { $set: { status: 0 } });
        }
    }
}

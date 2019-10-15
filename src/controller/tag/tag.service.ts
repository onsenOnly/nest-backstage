import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Tag } from '../../model/tag/tag.interface';
import { Upload } from '../../model/upload/upload.interface';
import { CreateTagDto } from '../../model/tag/tag.dto';
import { ConfigService } from '../../comm/config/config.service';
import { Logger } from 'log4js';

@Injectable()
export class TagService {
    constructor(
        @Inject('TAG_MODEL')
        private readonly tagModel: Model<Tag>,
        @Inject('UPLOAD_MODEL')
        private readonly uploadModel: Model<Upload>,
    ) { }
    async findOneByName(name: string): Promise<Tag> {
        return await this.tagModel.findOne({ categoryName: name });
    }

    async create(createTagDto: CreateTagDto) {
        await this.tagModel.create(createTagDto);
        const theFileName = createTagDto.fileName.substring(createTagDto.fileName.lastIndexOf('/') + 1, createTagDto.fileName.length);
        await this.uploadModel.updateMany({ tagUuid: createTagDto.tagUuid, fileName: theFileName }, { $set: { status: 1 } });
    }

    async queryTagList(condition, page, pageSize): Promise<Tag[]> {
        return await this.tagModel.find(condition).skip((page - 1) * pageSize).limit(Number(pageSize));
    }

    async queryAllTags(): Promise<Tag[]> {
        return await this.tagModel.find({});
    }

    async removeById(id) {
        const removeData = await this.tagModel.findByIdAndDelete({ _id: id });
        const theFileName = removeData.fileName.substring(removeData.fileName.lastIndexOf('/') + 1, removeData.fileName.length);
        await this.uploadModel.updateMany({ tagUuid: removeData.tagUuid, fileName: theFileName }, { $set: { status: 0 } });
    }

    async updateById(id, data) {
        const oldData = await this.tagModel.findByIdAndUpdate({ _id: id }, { $set: { updateTime: new Date(), categoryName: data.categoryName, tagUuid: data.tagUuid, fileName: data.fileName } });
        let theFileName = data.fileName.substring(data.fileName.lastIndexOf('/') + 1, data.fileName.length);
        await this.uploadModel.updateMany({ tagUuid: data.tagUuid, fileName: theFileName }, { $set: { status: 1 } });
        theFileName = oldData.fileName.substring(oldData.fileName.lastIndexOf('/') + 1, oldData.fileName.length);
        await this.uploadModel.updateMany({ tagUuid: oldData.tagUuid, fileName: theFileName }, { $set: { status: 0 } });
    }
}

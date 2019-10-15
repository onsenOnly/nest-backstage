import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Banner } from '../../model/banner/banner.interface';
import { Upload } from '../../model/upload/upload.interface';
// import { Route } from '../../model/permission/route.interface';
import { CreateBannerDto } from '../../model/banner/banner.dto';
import { ConfigService } from '../../comm/config/config.service';
import { Logger } from 'log4js';

@Injectable()
export class BannerService {
    constructor(
        @Inject('BANNER_MODEL')
        private readonly bannerModel: Model<Banner>,
        @Inject('UPLOAD_MODEL')
        private readonly uploadModel: Model<Upload>,
    ) { }
    async findById(ids: string): Promise<Banner[]> {
        return await this.bannerModel.find({ _id: { $in: ids } });
    }
    async findOneByName(name: string): Promise<Banner> {
        return await this.bannerModel.findOne({ categoryName: name });
    }
    async create(createBannerDto: CreateBannerDto) {
        await this.bannerModel.create(createBannerDto);
        const theFileName = createBannerDto.fileName.substring(createBannerDto.fileName.lastIndexOf('/') + 1, createBannerDto.fileName.length);
        await this.uploadModel.updateMany({ tagUuid: createBannerDto.tagUuid, fileName: theFileName }, { $set: { status: 1 } });
    }

    async queryTagList(condition, page, pageSize): Promise<Banner[]> {
        return await this.bannerModel.find(condition).skip((page - 1) * pageSize).limit(Number(pageSize));
    }

    async removeById(id) {
        const removeData = await this.bannerModel.findByIdAndDelete({ _id: id });
        const theFileName = removeData.fileName.substring(removeData.fileName.lastIndexOf('/') + 1, removeData.fileName.length);
        await this.uploadModel.updateMany({ tagUuid: removeData.tagUuid, fileName: theFileName }, { $set: { status: 0 } });
    }

    async updateById(id, data) {
        const oldData = await this.bannerModel.findByIdAndUpdate({ _id: id }, { $set: { updateTime: new Date(), categoryName: data.categoryName, tagUuid: data.tagUuid, fileName: data.fileName } });
        let theFileName = data.fileName.substring(data.fileName.lastIndexOf('/') + 1, data.fileName.length);
        await this.uploadModel.updateMany({ tagUuid: data.tagUuid, fileName: theFileName }, { $set: { status: 1 } });
        theFileName = oldData.fileName.substring(oldData.fileName.lastIndexOf('/') + 1, oldData.fileName.length);
        await this.uploadModel.updateMany({ tagUuid: oldData.tagUuid, fileName: theFileName }, { $set: { status: 0 } });
    }

    async removeManyById(tagUuidArr, allIdArr) {
        await this.bannerModel.deleteMany({ _id: { $in: allIdArr } });
        if (tagUuidArr.length > 0) {
            await this.uploadModel.updateMany({ tagUuid: { $in: tagUuidArr } }, { $set: { status: 0 } });
        }
    }
}

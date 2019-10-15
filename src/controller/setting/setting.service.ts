import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Setting } from '../../model/setting/setting.interface';
import { Upload } from '../../model/upload/upload.interface';
import { CreateSettingDto } from '../../model/setting/setting.dto';
import { ConfigService } from '../../comm/config/config.service';
import { Logger } from 'log4js';

@Injectable()
export class SettingService {
    constructor(
        @Inject('SETTING_MODEL')
        private readonly settingModel: Model<Setting>,
    ) { }
    async create(createSettingDto: CreateSettingDto) {
        await this.settingModel.create(createSettingDto);
    }

    async querySettingList(page, pageSize): Promise<Setting[]> {
        return await this.settingModel.find({}).sort({ createTime: 1 }).skip((page - 1) * pageSize).limit(Number(pageSize));
    }

    async removeById(id) {
        const removeData = await this.settingModel.remove({ _id: id });
    }

    async updateById(id, data) {
        const oldData = await this.settingModel.update({ _id: id }, { $set: { updateTime: new Date(), itemName: data.itemName, itemAddress: data.itemAddress } }, { multi: true });
    }
}

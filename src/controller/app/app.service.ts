import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { App } from '../../model/app/app.interface';
import { CreateAppDto } from '../../model/app/app.dto';
import * as crypto from 'crypto';

@Injectable()
export class AppService {
    constructor(
        @Inject('APP_MODEL')
        private readonly appModel: Model<App>,
    ) { }

    async queryAppConfigList(page, pageSize): Promise<App[]> {
        return await this.appModel.find({}).skip((page - 1) * pageSize).limit(Number(pageSize));
    }

    async queryAppConfigCount(): Promise<number> {
        return await this.appModel.count({});
    }

    async AppConfingFindOne(condition): Promise<App> {
        return await this.appModel.findOne(condition);
    }

    async createAppConfig(createAppConfigDto: CreateAppDto): Promise<App> {
        const createObj = {
            alias: createAppConfigDto.alias,
            dec: createAppConfigDto.dec,
            secret: crypto.createHash('md5').update(createAppConfigDto.alias).digest('base64'),
        };
        return await this.appModel.create(createObj);
    }
    async updateById(id, data) {
        return await this.appModel.update({ _id: id }, { $set: data }, { multi: true });
    }
    async removeOneById(condition) {
        await this.appModel.deleteOne(condition);
    }
    async removeManyById(condition) {
        await this.appModel.deleteMany(condition);
    }
    async queryAllAppConfig(): Promise<App[]> {
        return await this.appModel.find({}, { _id: true, alias: true }).sort({ CreateTime: 1 });
    }
}

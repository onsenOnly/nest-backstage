import { Model } from 'mongoose';
import { Injectable, Inject, LoggerService, ForbiddenException } from '@nestjs/common';
import { Cat } from '../../model/cats/cats.interface';
import { CreateCatDto } from '../../model/cats/cats.dto';
import { ConfigService } from '../../comm/config/config.service';
import { Logger } from 'log4js';

@Injectable()
export class CatsService {
    constructor(
        @Inject('CAT_MODEL')
        private readonly catModel: Model<Cat>,
    ) { }

    async create(createCatDto: CreateCatDto): Promise<Cat> {
        const createdCat = new this.catModel(createCatDto);
        return await createdCat.save();
    }

    async findAll(): Promise<Cat[]> {
        return await this.catModel.find().exec();
    }
}

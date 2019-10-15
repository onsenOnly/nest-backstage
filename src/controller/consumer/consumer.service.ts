import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Consumer } from '../../model/consumer/consumer.interface';

@Injectable()
export class ConsumerService {
    constructor(
        @Inject('CONSUMER_MODEL')
        private readonly consumerModel: Model<Consumer>,
    ) { }
    async queryConsumerList(page, pageSize): Promise<Consumer[]> {
        return await this.consumerModel.find({})
            .sort({ createAt: 1 })
            .skip((page - 1) * pageSize)
            .limit(Number(pageSize));
    }

    async queryConsumerOne(condition): Promise<Consumer> {
        return await this.consumerModel.findOne(condition);
    }
}

import { Module } from '@nestjs/common';
import { ConsumerController } from './consumer.controller';
import { ConsumerService } from './consumer.service';
import { consumerProviders } from '../../model/consumer/consumer.providers';

@Module({
    // imports: [ConfigModule],
    controllers: [ConsumerController],
    providers: [ConsumerService, ...consumerProviders],
})
export class ConsumerModule { }

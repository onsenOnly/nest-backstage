import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { catsProviders } from './cats.providers';

@Module({
    // imports: [ConfigModule],
    controllers: [CatsController],
    providers: [CatsService, ...catsProviders],
})
export class CatsModule { }

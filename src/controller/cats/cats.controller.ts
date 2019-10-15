import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UseGuards,
    UseInterceptors,
    UsePipes,
    HttpException,
    HttpStatus,
    ForbiddenException,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from '../../model/cats/cats.dto';
import { Cat } from '../../model/cats/cats.interface';
import { ConfigService } from '../../comm/config/config.service';
import { Roles } from '../../comm/guards/roles.decorator';
import { ErrorsInterceptor } from '../../comm/interceptors/exception.interceptor';

@Controller('cats')
export class CatsController {
    constructor(private readonly configService: ConfigService, private readonly catsService: CatsService) { }
    @Post()
    @UseInterceptors(new ErrorsInterceptor())
    @Roles('admin')
    async create(@Body() createCatDto: CreateCatDto) {
        // this.catsService.create(createCatDto);
        // throw new ForbiddenException();
        const g: any = '';
        g.get();
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        // console.info(this.configService);
        return this.catsService.findAll();
    }
}

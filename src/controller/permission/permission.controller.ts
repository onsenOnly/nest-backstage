import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    Res,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from '../../model/permission/permission.dto';
import { ConfigService } from '../../comm/config/config.service';
import { Request, Response } from 'express';
import { Permission } from '../../model/permission/permission.interface';

@Controller('permission')
// @UseInterceptors(new TransformInterceptor(getLogger('permission')))
export class PermissionController {
    constructor(private readonly configService: ConfigService, private readonly permissionService: PermissionService) { }
    // @Get()
    // async queryUser(@Req() req: Request) {
    //     const cookie = req.headers.cookie || '';
    //     const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' });
    //     const user = {};
    //     if (!cookies.token) {
    //         res.status(200).send({ message: 'Not Login' })
    //         return
    //     }
    // }
    @Get()
    async queryPermission(@Res() res: Response) {
        const permissionList = await this.permissionService.queryPermissionList();
        return { list: permissionList};
    }
    @Post()
    async createPermission(@Body() createPermissionDto: CreatePermissionDto, @Res() res: Response) {
        await this.permissionService.create(createPermissionDto);
        return { code: 0 };
    }
}

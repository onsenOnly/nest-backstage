import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Delete,
    Req,
    Res,
    UseInterceptors,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../../model/user/user.dto';
import { CreateLoginDto } from '../../model/user/login.dto';
import { User } from '../../model/user/user.interface';
import { ConfigService } from '../../comm/config/config.service';
import { ErrorsInterceptor } from '../../comm/interceptors/exception.interceptor';
import { TransformInterceptor } from '../../comm/interceptors/transform.interceptor';
import { Request, Response } from 'express';
import * as qs from 'qs';
import * as bcrypt from 'bcrypt';
import { getLogger } from 'log4js';

/**
 * 错误业务码：
 * 101001：not login 用户没有登录
 * 101002: user not exit 用户不存在
 * 101003：user or password fail 用户名或密码错误
 * get /user:获取用户信息
 * post /user:创建用户
 * post /user/login :用户登录
 * post /user/loginOut:退出登录
 * get /user/query :查询用户列表
 * post /user/update :更新用户信息
 * delete /user:id :删除某个用户
 * post /user/delete :批量删除用户
 */

@Controller('user')
// @UseInterceptors(new c(getLogger('user')))
export class UserController {
    constructor(private readonly configService: ConfigService, private readonly userService: UserService) { }
    /**
     * 获取某个用户信息
     * @param req
     * @param res
     */
    @Get()
    async queryUser(@Req() req: Request, @Res() res: Response) {
        const cookie = req.headers.cookie || '';
        const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' });
        const user = {};
        if (!cookies.token) {
            return { code: 101001, msg: 'not login' };
        }
        const token = JSON.parse(cookies.token);
        if (token) {
            if (token.deadline > new Date().getTime()) {
                const userData = await this.userService.getUserById(token.id);
                if (userData) {
                    const tmpUserData = JSON.parse(JSON.stringify(userData));
                    tmpUserData.password = undefined;
                    return { userData: tmpUserData };
                }
            }
        }
        return { code: 101001, msg: 'not login' };
    }

    /**
     * 创建用户
     * @param createUserDto
     */
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        await this.userService.create(createUserDto);
        return 200;
    }

    /**
     * 用户登录
     * @param createLoginDto
     * @param res
     */
    @Post('/login')
    async login(@Body() createLoginDto: CreateLoginDto, @Res() res: Response) {
        const userData = await this.userService.getUser(createLoginDto);
        if (!userData) {
            return { code: 101002, msg: 'user not exit' };
        }
        if (!bcrypt.compareSync(createLoginDto.password, userData.password)) {
            return { code: 101003, msg: 'user or password error' };
        }
        const now = new Date();
        now.setDate(now.getDate() + 1);
        const token = JSON.stringify({ id: userData._id, deadline: now.getTime() });
        res.cookie(
            'token',
            JSON.stringify({ id: userData._id, deadline: now.getTime() }),
            {
                maxAge: 900000,
                httpOnly: true,
            },
        );
        return 200;
    }

    /**
     * 退出登录
     * @param res
     */
    @Get('/loginOut')
    async loginOut(@Res() res: Response) {
        res.clearCookie('token');
        return 200;
    }
    /**
     * 查询用户列表
     * @param createLoginDto
     * @param res
     */
    @Get('/query')
    async queryUserList(@Req() req: Request, @Res() res: Response) {
        const page = req.body && req.query.page ? req.query.page : 1;
        const pageSize = req.body && req.query.pageSize ? req.query.pageSize : 10;
        const userDataList = await this.userService.getUserList(page, pageSize);
        const permissionDataList = await this.userService.getPermissionList();
        return { userList: userDataList, permissionList: permissionDataList };
    }

    /**
     * 更新用户信息
     * @param req
     * @param res
     */
    @Post('/update')
    async updateTag(@Req() req: Request, @Res() res: Response) {
        if (!req.body.id || !req.body.userName || !req.body.password || !req.body.permissions) {
            throw new HttpException('Params is incomplete', HttpStatus.PAYMENT_REQUIRED);
        }
        const data = {
            userName: req.body.userName,
            password: req.body.password,
            permissions: req.body.permissions,
        };
        await this.userService.updateById(req.body.id, data);
        return 200;
    }

    @Delete('/:id')
    async removeUser(@Req() req: Request, @Res() res: Response) {
        if (!req.params.id) {
            throw new HttpException('New message', HttpStatus.BAD_GATEWAY);
        }
        await this.userService.removeById({ _id: req.params.id });
        return 200;
    }

    @Post('/delete')
    async removeUserList(@Req() req: Request, @Res() res: Response) {
        if (!req.body.ids || req.body.ids.length === 0) {
            throw new HttpException('New message', HttpStatus.BAD_GATEWAY);
        }
        await this.userService.removeById({ _id: { $in: req.body.ids } });
        return 200;
    }
}

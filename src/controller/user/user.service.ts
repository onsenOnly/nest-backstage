import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../model/user/user.interface';
import { CreateUserDto } from '../../model/user/user.dto';
import { CreateLoginDto } from '../../model/user/login.dto';
import { ConfigService } from '../../comm/config/config.service';
import { Logger } from 'log4js';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_MODEL')
        private readonly userModel: Model<User>,
        @Inject('PERMISSION_MODEL')
        private readonly permissionModel: Model<User>,
    ) { }
    async create(createUserDto: CreateUserDto) {
        // const createdUser = new this.userModel({
        //     userName: createUserDto.userName,
        //     password: createUserDto.password,
        //     permissions: mongoose.Types.ObjectId(createUserDto.permissions),
        //     avatar: createUserDto.avatar,
        // });
        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }
    async getUser(createLoginDto: CreateLoginDto): Promise<User> {
        return await this.userModel.findOneAndUpdate({ userName: createLoginDto.userName }, { $set: { lastLoginTime: Date.now() } });
    }
    async getUserById(id: string): Promise<User> {
        return await this.userModel.findById(id).populate({ path: 'permissions', select: 'role' });
    }
    async getUserList(page: number, pageSize: number): Promise<User[]> {
        return await this.userModel.find({}).skip((page - 1) * pageSize).limit(Number(pageSize)).populate({ path: 'permissions', select: 'role' });
    }
    async getPermissionList(): Promise<User[]> {
        return await this.permissionModel.find({});
    }
    async updateById(id, data) {
        await this.userModel.update({ _id: id }, { $set: { userName: data.userName, password: data.password, permissions: data.permissions } });
    }
    async removeById(condition) {
        await this.userModel.remove(condition);
    }
}

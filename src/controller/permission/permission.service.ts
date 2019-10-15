import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Permission } from '../../model/permission/permission.interface';
import { CreatePermissionDto } from '../../model/permission/permission.dto';

@Injectable()
export class PermissionService {
    constructor(
        @Inject('PERMISSION_MODEL')
        private readonly permissionModel: Model<Permission>,
    ) { }
    async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
        const createPermission = new this.permissionModel(createPermissionDto);
        return await createPermission.save();
    }

    async queryPermissionList(): Promise<Permission[]> {
        return await this.permissionModel.find({});
    }
}

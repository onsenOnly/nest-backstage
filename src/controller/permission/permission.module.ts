import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { permissionProviders } from '../../model/permission/permission.providers';

@Module({
    // imports: [ConfigModule],
    controllers: [PermissionController],
    providers: [PermissionService, ...permissionProviders],
})
export class PermissionModule { }

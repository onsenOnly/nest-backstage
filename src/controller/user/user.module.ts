import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from '../../model/user/user.providers';
import { permissionProviders } from '../../model/permission/permission.providers';

@Module({
    // imports: [ConfigModule],
    controllers: [UserController],
    providers: [UserService, ...userProviders, ...permissionProviders],
})
export class UserModule { }

import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { settingProviders } from '../../model/setting/setting.providers';

@Module({
    // imports: [ConfigModule],
    controllers: [SettingController],
    providers: [SettingService, ...settingProviders],
})
export class SettingModule { }

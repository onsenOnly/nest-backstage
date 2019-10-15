import { IsInt, IsString } from 'class-validator';

export class CreateSettingDto {
    @IsString()
    readonly itemName: string;
    @IsString()
    readonly itemAddress: string;
}

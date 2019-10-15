import { IsInt, IsString } from 'class-validator';

export class CreateBannerDto {
    @IsString()
    readonly categoryName: string; // 对应categoryName
    @IsString()
    readonly fileName: string; // 对应fileName
    @IsString()
    readonly tagUuid: string; // 对应fileName

}

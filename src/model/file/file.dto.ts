import { IsInt, IsString } from 'class-validator';

export class CreateFileDto {
    @IsString()
    readonly noteName: string; // 对应fileName
    @IsString()
    readonly tagUuid: string; // 对应fileName

}

import { IsString } from 'class-validator';

export class CreateAppDto {
    @IsString()
    readonly alias: string;
    @IsString()
    readonly dec: string;
}

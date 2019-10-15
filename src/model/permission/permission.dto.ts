import {  IsString, IsArray } from 'class-validator';

export class CreatePermissionDto {
    @IsArray()
    readonly visit: string;
    @IsString()
    readonly role: string;
}

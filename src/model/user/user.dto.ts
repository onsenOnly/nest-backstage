import { IsInt, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    readonly userName: string;
    @IsString()
    readonly password: string;
    @IsString()
    readonly permissions: string;
    @IsString()
    readonly avatar: string;
}

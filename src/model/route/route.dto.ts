import { IsString } from 'class-validator';

export class CreateRouteDto {
    @IsString()
    readonly id: string;
    @IsString()
    readonly icon: string;
    @IsString()
    readonly name: string;
    @IsString()
    readonly route: string;
    @IsString()
    readonly role: string;
    readonly zh: { readonly name: string };
    readonly 'pt-br': { readonly name: string };
}

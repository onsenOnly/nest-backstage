import {
    ArgumentMetadata,
    Injectable,
    PipeTransform,
    BadRequestException,
    Type,
} from '@nestjs/common';
import { CustomValidationException } from '../exception/customValidation.exception';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        const { metatype } = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        // console.info(errors);
        // [ ValidationError {
        //     target: CreateCatDto { name: '333', age: 123, breed222: 'adddd' },
        //     value: undefined,
        //     property: 'breed',
        //     children: [],
        //     constraints: { isString: 'breed must be a string' } } ]
        if (errors.length > 0) {
            throw new CustomValidationException(errors[0]);
        }
        return value;
    }

    private toValidate(metatype: Type<any>): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find(type => metatype === type);
    }
}

import { HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { EXCEPTION_CODE } from './const.exception';

export class CustomValidationException extends BadRequestException {
    constructor(message?: string | object | any) {
        super(message);
    }
    getStatus(): number {
        return EXCEPTION_CODE.OK;
    }

    get statusCode(): number {
        return EXCEPTION_CODE.PARAM_VALIDATION;
    }
}

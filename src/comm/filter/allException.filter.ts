import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Inject } from '@nestjs/common';
import { Logger } from 'log4js';
import { CustomValidationException } from '../exception/customValidation.exception';
import { EXCEPTION_CODE } from '../exception/const.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly exceptionLogger: Logger) { }
    catch(exception: any, host: ArgumentsHost) {
        /* 当exception是系统内部错误的时候，exception.getStatus()会造成二次的错误。
            为了能更好的分配这种内部错误，把逻辑错误放在对应的逻辑去捕获，同时汇总到逻辑错误的日志里面。
            全局的错误依旧得拦截这样的错误才可以，以免逻辑忘记处理的情况。
        */
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        if (!exception.getStatus) {
            this.exceptionLogger.info('internal-error:' + exception.toString());
            this.exceptionLogger.info(exception);
            response.status(EXCEPTION_CODE.INTERNAL_ERROR).json({
                statusCode: EXCEPTION_CODE.INTERNAL_ERROR,
                msg: 'internal error',
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        } else if (exception instanceof CustomValidationException) {
            this.exceptionLogger.info('param-validation-error:');
            this.exceptionLogger.info(exception.message);
            const status = exception.getStatus();
            response.status(status).json({
                statusCode: EXCEPTION_CODE.PARAM_VALIDATION,
                msg: 'param validation error',
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        } else {
            this.exceptionLogger.info('other-error:');
            this.exceptionLogger.info(exception);
            const status = exception.getStatus();
            response.status(status).json({
                statusCode: status,
                msg: exception.message,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }
    }
}

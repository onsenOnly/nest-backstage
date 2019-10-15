import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from 'log4js';

export interface Response {
  data?: any;
  msg?: string;
  errorCode: number;
}

export interface ReplyObject {
  data?: any;
  msg?: string;
  code: number;
}

@Injectable()
export class TransformInterceptor
  implements NestInterceptor {
  constructor(
    private readonly interceptorLogger: Logger,
  ) { }
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(map((itemData) => {
      const result = {
        errorCode: undefined,
        msg: undefined,
      };
      let data;
      if (itemData) {
        if (itemData === 200) {
          result.errorCode = 0;
          result.msg = 'ok';
        } else if (itemData.code) {
          result.errorCode = itemData.code;
          result.msg = !itemData.code && itemData.code === 0 ? 'ok' : itemData.msg;
          console.info(result);
        } else {
          result.errorCode = 0;
          data = itemData;
        }
      } else {
        result.errorCode = 500;
        result.msg = 'return data is not exit';
      }
      const resultData = Object.assign(result, data);
      this.interceptorLogger.info(`${request.tagUuid}:${JSON.stringify(resultData)}`);
      return response.send(resultData);
    }));
  }
}

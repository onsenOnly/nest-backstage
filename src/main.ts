import { NestFactory, Reflector } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
// 解析器
import { json, urlencoded } from 'body-parser';
import { logger } from './comm/middleware/reqLogFun.middleware';
import { AllExceptionsFilter } from './comm/filter/allException.filter';
import { ValidationPipe } from './comm/pipe/validation.pipe';
import { RolesGuard } from './comm/guards/roles.guard';
import { TransformInterceptor } from './comm/interceptors/transform.interceptor';
import { getLogger } from 'log4js';
import * as cors from 'cors';
// import * as multer from 'multer';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);
  // 解析器中间件全局设置
//   app.use(cors({ origin: 'http://localhost:7001', credentials: true }));
  app.use(json({ limit: '50mb' }), urlencoded({ extended: false }));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.use(multer({ dest: '/tmp/' }).array('file'));
  // app.use(logger);
  // app.useGlobalGuards(new RolesGuard(new Reflector()));
  app.useGlobalInterceptors(new TransformInterceptor(getLogger('result')));
  // app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new AllExceptionsFilter(getLogger('all_exception')));

  await app.listen(3002);
}
bootstrap();

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerModule } from './comm/logger/logger.module';
import { ReqLoggerMiddleware } from './comm/middleware/reqLog.middleware';
import { ConfigModule } from './comm/config/config.module';
import { CatsModule } from './controller/cats/cats.module';
import { UserModule } from './controller/user/user.module';
import { PermissionModule } from './controller/permission/permission.module';
import { UploadModule } from './controller/upload/upload.module';
import { TagModule } from './controller/tag/tag.module';
import { BannerModule } from './controller/banner/banner.module';
import { RouteModule } from './controller/route/route.module';
import { PostModule } from './controller/post/post.module';
import { ConsumerModule } from './controller/consumer/consumer.module';
import { SettingModule } from './controller/setting/setting.module';
import { CommentModule } from './controller/comment/comment.module';
import { AppModule } from './controller/app/app.module';
import { FileModule } from './controller/file/file.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule, LoggerModule, CatsModule,
    UserModule, PermissionModule, UploadModule, TagModule, RouteModule,
    BannerModule, PostModule, ConsumerModule, SettingModule, CommentModule,
    AppModule, FileModule,
  ],
})

export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ReqLoggerMiddleware)
      .forRoutes('/');
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ArticleModule } from './modules/articles/articles.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PrismaExceptionFilter } from './shared/filters/prisma-exception.filter';


@Module({
  imports: [UserModule, PrismaModule, AuthModule, ArticleModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: PrismaExceptionFilter,
  },],
})
export class AppModule {}

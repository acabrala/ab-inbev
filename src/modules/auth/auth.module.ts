import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginUseCase } from '../auth/application/use-cases/auth/login.use-case';
import { PasswordHasherAdapter } from './infrastructure/adapter/password-hasher.adapter';
import { AuthRepository } from './infrastructure/repositories/auth/auth.repository';
import { PrismaService } from 'prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './presentation/controller/auth.controller';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: '2h' },
      }),
    }),
  ],
  providers: [
    JwtStrategy,
    LoginUseCase,
    PrismaService,
    {
      provide: 'AuthRepository',
      useClass: AuthRepository,
    },
    {
      provide: 'PasswordHasher',
      useClass: PasswordHasherAdapter,
    },
  ],
  exports: [JwtModule, JwtStrategy],

})
export class AuthModule {}

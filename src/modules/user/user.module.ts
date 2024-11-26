import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { CreateUserUseCase } from './application/use-cases/create-user/create-user.use-case';
import { UserRepository } from './infrastructure/repositories/user/user.repository';
import { PrismaService } from 'prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PasswordHasherAdapter } from '../auth/infrastructure/adapter/password-hasher.adapter';
import { DeleteUserUseCase } from './application/use-cases/delete-user/delete-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user/update-user.use-case';
import { ListUsersUseCase } from './application/use-cases/list-user/list-user.use-case';

@Module({
  controllers: [UserController],
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
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    { provide: 'PasswordHasher', 
      useClass: PasswordHasherAdapter 
    },
    CreateUserUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    ListUsersUseCase,
    PrismaService
  ],
})
export class UserModule {}

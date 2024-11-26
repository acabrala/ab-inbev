import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthRepository } from '../../../domain/interfaces/auth.interface';
import { IPasswordHasher } from 'src/modules/auth/domain/interfaces/password-hasher.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('AuthRepository') private readonly authRepository: IAuthRepository,
    @Inject('PasswordHasher') private readonly passwordHasher: IPasswordHasher,
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.authRepository.findUserByEmail(email);

    if (!user || !(await this.passwordHasher.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const payload = { sub: user.id, permissions: user.permissions.map((perm: any) => perm.name),
    };
    return this.jwtService.sign(payload);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/interfaces/user-repository.interface';
import { User } from '../../../domain/entities/user.entity';
import { IPasswordHasher } from 'src/modules/auth/domain/interfaces/password-hasher.interface';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
    @Inject('PasswordHasher') private readonly passwordHasher: IPasswordHasher,
  ) { }

  async execute(input: { name: string; email: string; password: string; permissions: number[] }): Promise<User> {
    try {
      const hashedPassword = await this.passwordHasher.hash(input.password);
      const user = new User({ ...input, password: hashedPassword, permissions: input.permissions });
      return this.userRepository.create(user);
    } catch (error) {
      throw error;
    }
  }
}

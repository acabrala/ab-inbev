import { Controller, Post, Body } from '@nestjs/common';
import { LoginUseCase } from '../../../auth/application/use-cases/auth/login.use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() { email, password }: { email: string; password: string }) {
    return { token: await this.loginUseCase.execute(email, password) };
  }
}

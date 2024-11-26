import { Controller, Post, Body, UseGuards, Delete, Param, Patch, ParseIntPipe, Get, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user/create-user.use-case';
import { CreateUserDto } from '../dto/create-user.dto/create-user.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { Roles } from 'src/shared/decorators/role.decorator';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user/delete-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user/update-user.use-case';
import { UpdateUserDto } from '../dto/update-user.dto/update-user.dto';
import { ListUsersUseCase } from '../../application/use-cases/list-user/list-user.use-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  async createUser(@Body() data: CreateUserDto) {
    try {
      return this.createUserUseCase.execute(data);
    } catch (error) {

      if (error.message === 'Este e-mail já está registrado. Tente com outro e-mail.') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw error;
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  async listUsers() {
    return this.listUsersUseCase.execute();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.deleteUserUseCase.execute(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    await this.updateUserUseCase.execute(id, updateUserDto);
  }
}

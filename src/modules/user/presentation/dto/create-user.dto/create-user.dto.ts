import { IsNotEmpty, IsString, IsEmail, IsArray, IsOptional, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsArray({ message: 'Permissions must be an array' })
  @IsNumber({}, { each: true, message: 'Each permission must be a number' })
  permissions: number[];
}

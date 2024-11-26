import { IsNotEmpty, IsString, IsEmail, IsArray, IsOptional, IsNumber, isNotEmpty } from 'class-validator';

export class CreateArticleDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()  
  content: string;

  createdBy: number;
  }
  
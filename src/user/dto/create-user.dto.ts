import { Prop } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsStrongPassword, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  // @IsEmail()
  // email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  // @IsUrl()
  // photo: string;
}

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: { name: string; password: string }) {
    try {
      const user = await this.authService.validateLogin(loginDto.name, loginDto.password);
      return { success: true, user: { name: user.name } };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() createUserDto: UpdateUserDto) {
    try {
      const user = await this.authService.register(createUserDto.name, createUserDto.password);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
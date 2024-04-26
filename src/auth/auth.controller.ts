import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginUserDto } from 'src/user/dto/user-login.dto';
import { Public } from 'src/decorator/role.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginUserDto): Promise<any> {
    return await this.authService.login(loginDto);
  }
}

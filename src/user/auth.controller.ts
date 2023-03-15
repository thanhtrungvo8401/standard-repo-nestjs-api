import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request as HttpRequest } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './authentication/local-auth.guard';
import { LoginUserDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async login(@Body() _login: LoginUserDto, @Request() req: HttpRequest) {
    const token = await this.authService.generateAccessToken(req.user);

    return {
      success: true,
      data: token,
    };
  }
}

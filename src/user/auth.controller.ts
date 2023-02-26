import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
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
  @UseGuards(LocalAuthGuard)
  async login(@Body() _login: LoginUserDto, @Request() req: HttpRequest) {
    return this.authService.generateAccessToken(req.user);
  }
}

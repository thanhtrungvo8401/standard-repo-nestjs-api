import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { DtoValidation } from 'src/pipes/DtoValidation.pipe';
import { JwtAuthGuard } from './authentication/jwt-auth.guard';
import { CreateUserDto } from './dto';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return this.userService.findAll();
  }

  @Post()
  @HttpCode(200)
  @UsePipes(DtoValidation<CreateUserDto>)
  async createUsers(@Body() user: CreateUserDto) {
    const userEntity: UserEntity = plainToInstance(UserEntity, user);

    const response = await this.userService.create(userEntity);

    return { success: true, data: response };
  }
}

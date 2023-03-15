import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  // UseGuards,
  UsePipes,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { HelperService } from 'src/helper/helper.service';
import { DtoValidation } from 'src/pipes/DtoValidation.pipe';
// import { JwtAuthGuard } from './authentication/jwt-auth.guard';
import { CreateUserDto, VerifyAccountDto } from './dto';
import { ResendOtpDto } from './dto/resend-otp.dto';
import { UserEntity } from './entity/user.entity';
import { OtpService } from './otp.service';
import { CreateUserValidationPipe } from './pipes/create-users.validation.pipe';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private helperService: HelperService,
    private otpService: OtpService,
  ) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getUsers() {
    // return this.userService.findAll();
    return this.helperService.generateOtp(6);
  }

  @Post()
  @HttpCode(200)
  @UsePipes(DtoValidation<CreateUserDto>, CreateUserValidationPipe)
  async createUsers(@Body() user: CreateUserDto) {
    const userEntity: UserEntity = plainToInstance(UserEntity, user);

    await this.userService.create(userEntity);

    return { success: true };
  }

  @Post('/verify')
  @HttpCode(200)
  @UsePipes(DtoValidation<VerifyAccountDto>)
  async verifyAccount(@Body() data: VerifyAccountDto) {
    await this.otpService.verifyAccount(data);

    return { success: true };
  }

  @Post('/resend-otp')
  @HttpCode(200)
  @UsePipes(DtoValidation<ResendOtpDto>)
  async resendOtp(@Body() data: ResendOtpDto) {
    await this.otpService.resendOtp(data);

    return { success: true };
  }
}

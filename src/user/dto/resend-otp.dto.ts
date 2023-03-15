import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResendOtpDto {
  @IsEmail()
  @ApiProperty()
  readonly email: string;
}

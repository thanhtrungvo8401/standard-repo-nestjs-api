import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @ApiProperty({ description: 'Your email account' })
  readonly username: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;
}

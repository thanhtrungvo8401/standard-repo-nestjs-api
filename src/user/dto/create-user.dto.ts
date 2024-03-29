import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly lastName: string;

  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly phone: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly dateOfBirth: string;
}

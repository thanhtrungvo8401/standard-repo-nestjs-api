import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { plainToInstance } from 'class-transformer';
import { LoginUserDto, LoginUserRO, UserRO } from './dto';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: LoginUserDto): Promise<Partial<UserRO> | null> {
    const user: UserEntity | null = await this.userService.findOne({
      email: login.username,
    });

    if (!user) return null;

    const isValidCredential = await argon2.verify(
      user.password,
      login.password,
    );

    if (!isValidCredential) return null;

    return plainToInstance(UserRO, user, {
      excludePrefixes: ['password'],
    });
  }

  async generateAccessToken(user: Partial<UserRO>): Promise<LoginUserRO> {
    const payload = { email: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

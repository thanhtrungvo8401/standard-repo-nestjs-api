import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './authentication/jwt.strategy';
import { LocalAuthGuard } from './authentication/local-auth.guard';
import { LocalStrategy } from './authentication/local.strategy';
import { JWT_SECRET } from './contants';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController, AuthController],
  providers: [
    UserService,
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
  ],
})
export class UserModule {}

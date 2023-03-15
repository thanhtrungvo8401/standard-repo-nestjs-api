import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperModule } from 'src/helper/helper.module';
import { SendgridMailModule } from 'src/send-grid-mail/send-grid-mail.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './authentication/jwt.strategy';
import { LocalAuthGuard } from './authentication/local-auth.guard';
import { LocalStrategy } from './authentication/local.strategy';
import { UserEntity } from './entity/user.entity';
import { OtpService } from './otp.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    PassportModule,
    HelperModule,
    SendgridMailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRE_DURATION'),
          },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController, AuthController],
  providers: [
    UserService,
    OtpService,
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    {
      provide: JwtStrategy,
      useFactory: async (configService: ConfigService) => {
        const jwtSecret = configService.get<string>('JWT_SECRET');
        return new JwtStrategy(jwtSecret);
      },
      inject: [ConfigService],
    },
  ],
})
export class UserModule {}

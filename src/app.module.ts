import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SendgridMailModule } from './send-grid-mail/send-grid-mail.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HelperModule } from './helper/helper.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    HelperModule,
    SendgridMailModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: Number(configService.get<string>('DB_PORT')),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    // CacheModule.registerAsync({
    //   isGlobal: true,
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => {
    //     return {
    //       ttl: Number(configService?.get<string>('CACHE_TTL')) * 1000,
    //     };
    //   },
    //   inject: [ConfigService],
    // }),

    CacheModule.register({
      isGlobal: true,
      ttl: 180, // 180seconds
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

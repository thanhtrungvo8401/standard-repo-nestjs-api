import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { HelperService } from 'src/helper/helper.service';
import { SendGridMailService } from 'src/send-grid-mail/send-grid-mail.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private helperService: HelperService,
    private sendMail: SendGridMailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(): Promise<Array<UserEntity>> {
    const users = await this.userRepo.find();
    return users;
  }

  async findOne(query: FindOptionsWhere<UserEntity>): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: query });
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const instance = this.userRepo.create({ ...user, isVerified: false });

    const response = await this.userRepo.save(instance);

    const otp = this.helperService.generateOtp(6);

    this.cacheManager.set(response.email, otp);

    await this.sendMail.sendVerifyOtp({ to: response.email, otp });

    return response;
  }
}

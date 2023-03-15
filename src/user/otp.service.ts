import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { ErrorCodes } from 'src/common/enums/error-codes';
import { HelperService } from 'src/helper/helper.service';
import { SendGridMailService } from 'src/send-grid-mail/send-grid-mail.service';
import { Repository } from 'typeorm';
import { VerifyAccountDto } from './dto';
import { ResendOtpDto } from './dto/resend-otp.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private helperService: HelperService,
    private sendMail: SendGridMailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async verifyAccount(data: VerifyAccountDto): Promise<void> {
    const user = await this.userRepo.findOne({
      where: { email: data.email, isVerified: false },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const cachedOtp = await this.cacheManager.get(data.email);

    console.log(cachedOtp, 'CACHED OTP');

    if (cachedOtp !== data.otp) {
      throw new BadRequestException(ErrorCodes.OtpExpired);
    }

    user.isVerified = true;

    await this.userRepo.save(user);
  }

  async resendOtp(data: ResendOtpDto): Promise<void> {
    const user = await this.userRepo.findOne({
      where: { email: data.email, isVerified: false },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const cachedOtp = await this.cacheManager.get(data.email);

    if (cachedOtp) throw new MethodNotAllowedException();

    const otp = this.helperService.generateOtp(6);

    await this.cacheManager.set(data.email, otp);

    await this.sendMail.sendVerifyOtp({ to: user.email, otp });
  }
}

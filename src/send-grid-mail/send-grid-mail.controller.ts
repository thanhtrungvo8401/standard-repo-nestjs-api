import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SendGridMailService } from './send-grid-mail.service';
// import * as SendGrid from '@sendgrid/mail';
import { IOtpContent } from './interfaces/otp-content.interface';

@Controller('send-grid-mail')
export class SendGridMailController {
  constructor(private sendGridMailService: SendGridMailService) {}

  @Post('send')
  @HttpCode(200)
  async sendMail(@Body() data: IOtpContent) {
    return this.sendGridMailService.sendVerifyOtp(data);
  }
}

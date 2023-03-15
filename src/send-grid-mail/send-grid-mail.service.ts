import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { IOtpContent } from './interfaces/otp-content.interface';

@Injectable()
export class SendGridMailService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
  }

  async sendMail(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);

    return transport;
  }

  async sendVerifyOtp(otpContent: IOtpContent) {
    const mail: SendGrid.MailDataRequired = {
      to: otpContent.to,
      subject: 'Xác thực tài khoản',
      from: this.configService.get<string>('SEND_OTP_FROM'),
      text: `Deal Lương
            Mã xác thực của quý khách là ${otpContent.otp} vui lòng nhập mã xác thực trong 3 phút để hoàn tất việc đăng kí tài khoản.`,
      html: `
      <div style="max-width: 600px; padding: 1rem; margin: 0 auto">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <h2 style="border-bottom:1px solid #eee; font-size: 1.4em;color: #1a1a1a">
          Deal Lương
        </h2>
        <p>Mã xác thực của quý khách là <strong>${otpContent.otp}</strong> vui lòng nhập mã xác thực trong <strong>3 phút</strong> để hoàn tất việc đăng kí tài khoản.</p>
        </div>
      </div>
    </div>
      `,
    };

    const transport = await SendGrid.send(mail);

    return transport;
  }
}

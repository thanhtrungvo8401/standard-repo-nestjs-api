import { Module } from '@nestjs/common';
import { SendGridMailService } from './send-grid-mail.service';
import { SendGridMailController } from './send-grid-mail.controller';

@Module({
  providers: [SendGridMailService],
  controllers: [SendGridMailController],
  exports: [SendGridMailService],
})
export class SendgridMailModule {}

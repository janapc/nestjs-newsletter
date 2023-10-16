import { RegisterMail } from '@mails/application/usecases/register-mail';
import { RemoveMail } from '@mails/application/usecases/remove-mail';
import { SendMails } from '@mails/application/usecases/send-mails';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterEmailPayloadDto } from '../dtos/register-email-payload.dto';
import { RemoveEmailPayloadDto } from '../dtos/remove-email-payload.dto';
import { SendEmailPayloadDto } from '../dtos/send-email-payload.dto';

@Controller()
export class KafkaMailController {
  constructor(
    private registerMail: RegisterMail,
    private removeMail: RemoveMail,
    private sendMails: SendMails,
  ) {}

  @MessagePattern('register-subscriber-topic')
  async registerEmail(@Payload() message: RegisterEmailPayloadDto) {
    await this.registerMail.execute(message.email);
  }

  @MessagePattern('remove-subscriber-topic')
  async removeEmail(@Payload() message: RemoveEmailPayloadDto) {
    await this.removeMail.execute(message.email);
  }

  @MessagePattern('content-topic')
  async sendEmail(@Payload() message: SendEmailPayloadDto) {
    await this.sendMails.execute(message);
  }
}

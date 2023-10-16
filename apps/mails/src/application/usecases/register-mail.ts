import { Injectable } from '@nestjs/common';
import Mail from '../entities/mail.entity';
import { MailRepository } from '../repositories/mail.repository';

@Injectable()
export class RegisterMail {
  constructor(private mailRepository: MailRepository) {}

  async execute(email: string): Promise<void> {
    const mail = new Mail({ email });
    await this.mailRepository.register(mail);
    console.log(`register ${mail.id} with email ${mail.email}`);
  }
}

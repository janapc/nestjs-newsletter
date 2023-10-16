import { Injectable, NotFoundException } from '@nestjs/common';
import { MailRepository } from '../repositories/mail.repository';

@Injectable()
export class RemoveMail {
  constructor(private mailRepository: MailRepository) {}

  async execute(email: string): Promise<void> {
    const mail = await this.mailRepository.findByEmail(email);
    if (!mail) {
      throw new NotFoundException('Email not found');
    }
    await this.mailRepository.remove(mail.id);
    console.log(`remove ${mail.id} with email ${mail.email}`);
  }
}

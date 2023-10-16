import Mail from '@mails/application/entities/mail.entity';
import { MailRepository } from '@mails/application/repositories/mail.repository';

export class MailInMemoryRepository implements MailRepository {
  mails: Mail[] = [];

  async register(mail: Mail): Promise<void> {
    this.mails.push(mail);
  }

  async findByEmail(email: string): Promise<Mail | null> {
    const mail = await this.mails.find((mail) => mail.email === email);
    return mail ?? null;
  }

  async remove(id: string): Promise<void> {
    const mailIndex = this.mails.findIndex((item) => item.id === id);
    this.mails.splice(mailIndex, 1);
  }

  async findAll(): Promise<Mail[] | null> {
    return !this.mails.length ? null : this.mails;
  }

  async update(mail: Mail): Promise<void> {
    const mailIndex = this.mails.findIndex((item) => item.id === mail.id);
    this.mails[mailIndex] = mail;
  }
}

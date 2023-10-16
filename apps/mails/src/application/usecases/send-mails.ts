import { Injectable, NotFoundException } from '@nestjs/common';
import { MailRepository } from '../repositories/mail.repository';
import { NotificationRepository } from '../repositories/notification.repository';
import Notification from '../entities/notification.entity';

interface InputSendMails {
  body: string;
  title: string;
  content_id: string;
}

@Injectable()
export class SendMails {
  constructor(
    private mailRepository: MailRepository,
    private emailNotificationRepository: NotificationRepository,
  ) {}

  async execute(input: InputSendMails): Promise<void> {
    const mails = await this.mailRepository.findAll();
    if (!mails) {
      throw new NotFoundException('Mails not found');
    }
    const emails = mails.map((mail) => mail.email);
    const notification = new Notification({
      from: String(process.env.MAIL_FROM),
      subject: input.title,
      body: input.body,
      to: emails.join(','),
    });
    await this.emailNotificationRepository.sendEmail(notification);
    for (const item of mails) {
      item.content_id = input.content_id;
      item.updateDate();
      await this.mailRepository.update(item);
      console.log(`send email to ${item.email}`);
    }
  }
}

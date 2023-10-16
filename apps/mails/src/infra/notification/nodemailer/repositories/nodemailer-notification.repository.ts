import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { NotificationRepository } from '@mails/application/repositories/notification.repository';
import Notification from '@mails/application/entities/notification.entity';
import { NodemailerMapper } from '../mappers/nodemailer.mapper';

@Injectable()
export class NodemailerNotificationRepository
  implements NotificationRepository
{
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.transporter = this.transporterNodemailer();
  }

  async sendEmail(notification: Notification): Promise<void> {
    const data = NodemailerMapper.toNodemailer(notification);
    await this.transporter.sendMail(data);
  }

  private transporterNodemailer() {
    return nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT) || 0,
      secure: false,
      auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASS,
      },
    });
  }
}

import { Module } from '@nestjs/common';
import { NodemailerNotificationRepository } from './nodemailer/repositories/nodemailer-notification.repository';
import { NotificationRepository } from '@mails/application/repositories/notification.repository';

@Module({
  providers: [
    {
      provide: NotificationRepository,
      useClass: NodemailerNotificationRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class NotificationModule {}

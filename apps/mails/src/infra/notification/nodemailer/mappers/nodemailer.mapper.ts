import Notification from '@mails/application/entities/notification.entity';

export class NodemailerMapper {
  static toNodemailer(notification: Notification) {
    return {
      from: notification.from,
      to: notification.to,
      subject: notification.subject,
      text: notification.body,
    };
  }
}

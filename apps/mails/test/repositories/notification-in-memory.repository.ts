import Notification from '@mails/application/entities/notification.entity';
import { NotificationRepository } from '@mails/application/repositories/notification.repository';

export class NotificationInMemoryRepository implements NotificationRepository {
  notifications: Notification[] = [];

  async sendEmail(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}

import Notification from '../entities/notification.entity';

export abstract class NotificationRepository {
  abstract sendEmail(notification: Notification): Promise<void>;
}

import Subscriber from '../entities/subscriber.entity';

export abstract class MessagingSubscriberRepository {
  abstract sendMessage(subscribers: Subscriber[], topic: string): Promise<void>;
}

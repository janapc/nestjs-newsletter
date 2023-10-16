import Subscriber from '@subscribers/application/entities/subscriber.entity';
import { MessagingSubscriberRepository } from '@subscribers/application/repositories/messaging-subscriber.repository';

interface Message {
  value: string;
}

export class MessagingSubscriberInMemoryRepository
  implements MessagingSubscriberRepository
{
  async sendMessage(subscribers: Subscriber[], topic: string): Promise<void> {
    const record = subscribers.map((item) => ({
      topic,
      value: JSON.stringify({ email: item.email }),
    }));
    this.messages.push(...record);
  }
  public messages: Message[] = [];
}

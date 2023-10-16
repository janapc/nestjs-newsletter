import Subscriber from '@subscribers/application/entities/subscriber.entity';
import { SubscriberRepository } from '@subscribers/application/repositories/subscriber.repository';

export class SubscriberInMemoryRepository implements SubscriberRepository {
  public subscribers: Subscriber[] = [];

  async create(subscriber: Subscriber): Promise<void> {
    this.subscribers.push(subscriber);
  }

  async findAllActive(): Promise<Subscriber[]> {
    return this.subscribers.filter((item) => !item.unsubscriberAt);
  }

  async findAllInactive(): Promise<Subscriber[]> {
    return this.subscribers.filter((item) => item.unsubscriberAt);
  }

  async findByEmail(email: string): Promise<Subscriber | null> {
    const subscriber = this.subscribers.find((item) => item.email === email);
    return subscriber ?? null;
  }

  async findById(id: string): Promise<Subscriber | null> {
    const subscriber = this.subscribers.find((item) => item.id === id);
    return subscriber ?? null;
  }

  async save(subscriber: Subscriber): Promise<void> {
    const subscriberIndex = this.subscribers.findIndex(
      (item) => item.id === subscriber.id,
    );
    if (subscriberIndex >= 0) {
      this.subscribers[subscriberIndex] = subscriber;
    }
  }
}

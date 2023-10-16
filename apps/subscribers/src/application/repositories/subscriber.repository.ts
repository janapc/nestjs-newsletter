import Subscriber from '../entities/subscriber.entity';

export abstract class SubscriberRepository {
  abstract create(subscriber: Subscriber): Promise<void>;
  abstract save(subscriber: Subscriber): Promise<void>;
  abstract findByEmail(email: string): Promise<Subscriber | null>;
  abstract findById(id: string): Promise<Subscriber | null>;
  abstract findAllActive(): Promise<Subscriber[]>;
  abstract findAllInactive(): Promise<Subscriber[]>;
}

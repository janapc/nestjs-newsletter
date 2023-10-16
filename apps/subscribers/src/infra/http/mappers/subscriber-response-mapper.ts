import Subscriber from '@subscribers/application/entities/subscriber.entity';

export class SubscriberResponseMapper {
  static toHTTP(subscriber: Subscriber) {
    return {
      id: subscriber.id,
      email: subscriber.email,
      unsubscriberAt: subscriber.unsubscriberAt,
      createdAt: subscriber.createdAt,
    };
  }
}

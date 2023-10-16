import Subscriber from '@subscribers/application/entities/subscriber.entity';

export class MessageKafkaMapper {
  static toKafka(subscriber: Subscriber) {
    return {
      value: JSON.stringify({
        email: subscriber.email,
      }),
    };
  }
}

import { Subscriber as RawSubscriber } from '@prisma/client';

import Subscriber from '@subscribers/application/entities/subscriber.entity';

export class PrismaSubscriberMapper {
  static toPrisma(subscriber: Subscriber) {
    return {
      id: subscriber.id,
      createdAt: subscriber.createdAt,
      unsubscriberAt: subscriber.unsubscriberAt,
      email: subscriber.email,
    };
  }

  static toDomain(body: RawSubscriber): Subscriber {
    return new Subscriber(
      {
        email: body.email,
        unsubscriberAt: body.unsubscriberAt,
        createdAt: body.createdAt,
      },
      body.id,
    );
  }
}

import { Injectable } from '@nestjs/common';
import Subscriber from '../entities/subscriber.entity';
import { SubscriberRepository } from '../repositories/subscriber.repository';

interface GetInactiveSubscribersOutput {
  subscribers: Subscriber[];
}

@Injectable()
export class GetInactiveSubscribers {
  constructor(private subscriberRepository: SubscriberRepository) {}

  async execute(): Promise<GetInactiveSubscribersOutput> {
    const subscribers = await this.subscriberRepository.findAllInactive();
    return { subscribers };
  }
}

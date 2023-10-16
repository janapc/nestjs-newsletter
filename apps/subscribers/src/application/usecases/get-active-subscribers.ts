import { Injectable } from '@nestjs/common';
import Subscriber from '../entities/subscriber.entity';
import { SubscriberRepository } from '../repositories/subscriber.repository';

interface GetActiveSubscribersOutput {
  subscribers: Subscriber[];
}

@Injectable()
export class GetActiveSubscribers {
  constructor(private subscriberRepository: SubscriberRepository) {}

  async execute(): Promise<GetActiveSubscribersOutput> {
    const subscribers = await this.subscriberRepository.findAllActive();
    return { subscribers };
  }
}

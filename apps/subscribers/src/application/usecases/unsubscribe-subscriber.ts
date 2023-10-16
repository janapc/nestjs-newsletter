import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscriberRepository } from '../repositories/subscriber.repository';
import { MessagingSubscriberRepository } from '../repositories/messaging-subscriber.repository';

@Injectable()
export class UnsubscribeSubscriber {
  constructor(
    private subscriberRepository: SubscriberRepository,
    private messagingSubscriberRepository: MessagingSubscriberRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const subscriber = await this.subscriberRepository.findById(id);
    if (!subscriber) {
      throw new NotFoundException('subscriber not found');
    }
    subscriber.unsubscribe();
    await this.subscriberRepository.save(subscriber);
    await this.messagingSubscriberRepository.sendMessage(
      [subscriber],
      'remove-subscriber-topic',
    );
  }
}

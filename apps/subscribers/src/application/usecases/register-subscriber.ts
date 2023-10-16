import { BadRequestException, Injectable } from '@nestjs/common';
import Subscriber from '../entities/subscriber.entity';
import { SubscriberRepository } from '../repositories/subscriber.repository';
import { MessagingSubscriberRepository } from '../repositories/messaging-subscriber.repository';

interface RegisterSubscriberInput {
  email: string;
}

@Injectable()
export class RegisterSubscriber {
  constructor(
    private subscriberRepository: SubscriberRepository,
    private messagingSubscriberRepository: MessagingSubscriberRepository,
  ) {}

  async execute(input: RegisterSubscriberInput): Promise<void> {
    const { email } = input;
    const hasSubscriber = await this.subscriberRepository.findByEmail(email);
    if (hasSubscriber) {
      throw new BadRequestException('subscriber has registed');
    }
    const subscriber = new Subscriber({ email });
    await this.subscriberRepository.create(subscriber);
    await this.messagingSubscriberRepository.sendMessage(
      [subscriber],
      'register-subscriber-topic',
    );
  }
}

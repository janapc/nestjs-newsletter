import { Module } from '@nestjs/common';
import { KafkaSubscriberRepository } from './kafka/repositories/kafka-subscriber.repository';
import { MessagingSubscriberRepository } from '@subscribers/application/repositories/messaging-subscriber.repository';

@Module({
  providers: [
    {
      provide: MessagingSubscriberRepository,
      useClass: KafkaSubscriberRepository,
    },
  ],
  exports: [MessagingSubscriberRepository],
})
export class MessagingModule {}

import { Module } from '@nestjs/common';
import { MessagingContentRepository } from '@contents/application/repositories/messaging-content.repository';
import { KafkaContentRepository } from './kafka/repositories/kafka-content.repository';

@Module({
  providers: [
    {
      provide: MessagingContentRepository,
      useClass: KafkaContentRepository,
    },
  ],
  exports: [MessagingContentRepository],
})
export class MessagingModule {}

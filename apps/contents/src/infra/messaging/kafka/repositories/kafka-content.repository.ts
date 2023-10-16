import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import Content from '@contents/application/entities/content.entity';
import { MessagingContentRepository } from '@contents/application/repositories/messaging-content.repository';
import { MessageKafkaMapper } from '../mappers/message-kafka.mapper';

@Injectable()
export class KafkaContentRepository
  implements OnModuleInit, OnApplicationShutdown, MessagingContentRepository
{
  private readonly kafka = new Kafka({
    brokers: ['localhost:9092'],
  });
  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }

  async sendMessage(contents: Content[]): Promise<void> {
    const topic = 'content-topic';
    const messages = contents.map(MessageKafkaMapper.toKafka);
    const record: ProducerRecord = {
      topic,
      messages,
    };
    await this.producer.send(record);
  }
}

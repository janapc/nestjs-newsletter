import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { MessageKafkaMapper } from '../mappers/message-kafka.mapper';
import { MessagingSubscriberRepository } from '@subscribers/application/repositories/messaging-subscriber.repository';
import Subscriber from '@subscribers/application/entities/subscriber.entity';

@Injectable()
export class KafkaSubscriberRepository
  implements OnModuleInit, OnApplicationShutdown, MessagingSubscriberRepository
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

  async sendMessage(subscribers: Subscriber[], topic: string): Promise<void> {
    const messages = subscribers.map(MessageKafkaMapper.toKafka);
    const record: ProducerRecord = {
      topic,
      messages,
    };
    await this.producer.send(record);
  }
}

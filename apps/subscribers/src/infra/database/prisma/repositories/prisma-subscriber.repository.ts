import { Injectable } from '@nestjs/common';
import Subscriber from '@subscribers/application/entities/subscriber.entity';
import { SubscriberRepository } from '@subscribers/application/repositories/subscriber.repository';
import { PrismaService } from '../prisma.service';
import { PrismaSubscriberMapper } from '../mappers/prisma-subscriber.mapper';

@Injectable()
export class PrismaSubscriberRepository implements SubscriberRepository {
  constructor(private prismaService: PrismaService) {}

  async save(subscriber: Subscriber): Promise<void> {
    const body = PrismaSubscriberMapper.toPrisma(subscriber);
    await this.prismaService.subscriber.update({
      where: {
        id: body.id,
      },
      data: body,
    });
  }

  async findByEmail(email: string): Promise<Subscriber | null> {
    const subscriber = await this.prismaService.subscriber.findUnique({
      where: {
        email,
      },
    });
    if (!subscriber) return null;

    return PrismaSubscriberMapper.toDomain(subscriber);
  }

  async findById(id: string): Promise<Subscriber | null> {
    const subscriber = await this.prismaService.subscriber.findUnique({
      where: {
        id,
      },
    });

    if (!subscriber) return null;

    return PrismaSubscriberMapper.toDomain(subscriber);
  }

  async findAllActive(): Promise<Subscriber[]> {
    const subscribers = await this.prismaService.subscriber.findMany({
      where: {
        unsubscriberAt: null,
      },
    });

    return subscribers.map(PrismaSubscriberMapper.toDomain);
  }

  async findAllInactive(): Promise<Subscriber[]> {
    const subscribers = await this.prismaService.subscriber.findMany({
      where: {
        NOT: {
          unsubscriberAt: null,
        },
      },
    });

    return subscribers.map(PrismaSubscriberMapper.toDomain);
  }

  async create(subscriber: Subscriber): Promise<void> {
    const body = PrismaSubscriberMapper.toPrisma(subscriber);
    await this.prismaService.subscriber.create({
      data: body,
    });
  }
}

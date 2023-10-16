import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaSubscriberRepository } from './prisma/repositories/prisma-subscriber.repository';
import { SubscriberRepository } from '@subscribers/application/repositories/subscriber.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: SubscriberRepository,
      useClass: PrismaSubscriberRepository,
    },
  ],
  exports: [SubscriberRepository],
})
export class DatabaseModule {}

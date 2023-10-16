import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SubscriberController } from './controllers/subscriber.controller';
import { RegisterSubscriber } from '@subscribers/application/usecases/register-subscriber';
import { UnsubscribeSubscriber } from '@subscribers/application/usecases/unsubscribe-subscriber';
import { GetActiveSubscribers } from '@subscribers/application/usecases/get-active-subscribers';
import { GetInactiveSubscribers } from '@subscribers/application/usecases/get-inactive-subscribers';
import { MessagingModule } from '../messaging/messaging.module';

@Module({
  imports: [DatabaseModule, MessagingModule],
  controllers: [SubscriberController],
  providers: [
    RegisterSubscriber,
    UnsubscribeSubscriber,
    GetActiveSubscribers,
    GetInactiveSubscribers,
  ],
})
export class HttpModule {}

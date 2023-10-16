import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { MessagingModule } from './infra/messaging/messaging.module';
import { NotificationModule } from './infra/notification/notification.module';

@Module({
  imports: [DatabaseModule, MessagingModule, NotificationModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { KafkaMailController } from './kafka/controllers/kafka-mail.controller';
import { RegisterMail } from '@mails/application/usecases/register-mail';
import { DatabaseModule } from '../database/database.module';
import { RemoveMail } from '@mails/application/usecases/remove-mail';
import { SendMails } from '@mails/application/usecases/send-mails';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [DatabaseModule, NotificationModule],
  controllers: [KafkaMailController],
  providers: [RegisterMail, RemoveMail, SendMails],
})
export class MessagingModule {}

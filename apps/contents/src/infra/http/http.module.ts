import { DatabaseModule } from '@contents/infra/database/database.module';
import { Module } from '@nestjs/common';
import { ContentController } from './controllers/content.controller';
import { GetContents } from '@contents/application/usecases/get-contents';
import { RegisterContent } from '@contents/application/usecases/register-content';
import { MessagingModule } from '../messaging/messaging.module';

@Module({
  imports: [DatabaseModule, MessagingModule],
  controllers: [ContentController],
  providers: [GetContents, RegisterContent],
})
export class HttpModule {}

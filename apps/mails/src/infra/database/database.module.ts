import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Mail, MailSchema } from './mongoose/schemas/mongoose-mail.schema';
import { MailRepository } from '@mails/application/repositories/mail.repository';
import { MongooseMailRepository } from './mongoose/repositories/mongoose-mail.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/mails/.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Mail.name, schema: MailSchema }]),
  ],
  providers: [
    {
      provide: MailRepository,
      useClass: MongooseMailRepository,
    },
  ],
  exports: [MailRepository],
})
export class DatabaseModule {}

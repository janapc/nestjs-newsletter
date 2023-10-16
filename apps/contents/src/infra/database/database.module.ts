import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Content,
  ContentSchema,
} from './mongoose/schemas/mongoose-content.schema';
import { ContentRepository } from '@contents/application/repositories/content.repository';
import { MongooseContentRepository } from './mongoose/repositories/mongoose-content.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/contents/.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }]),
  ],
  providers: [
    {
      provide: ContentRepository,
      useClass: MongooseContentRepository,
    },
  ],
  exports: [ContentRepository],
})
export class DatabaseModule {}

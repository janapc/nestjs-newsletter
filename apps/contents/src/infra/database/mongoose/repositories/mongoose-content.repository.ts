import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ContentRepository } from '@contents/application/repositories/content.repository';
import { Content as MongooseContent } from '../schemas/mongoose-content.schema';
import Content from '@contents/application/entities/content.entity';
import { MongooseContentMapper } from '../mappers/mongoose-content.mapper';

@Injectable()
export class MongooseContentRepository implements ContentRepository {
  constructor(
    @InjectModel(MongooseContent.name)
    private contentModel: Model<MongooseContent>,
  ) {}

  async create(content: Content): Promise<void> {
    const data = MongooseContentMapper.toMongoose(content);
    await this.contentModel.create(data);
  }

  async findAll(): Promise<Content[]> {
    const response = await this.contentModel.find();
    return response.map(MongooseContentMapper.toDomain);
  }
}

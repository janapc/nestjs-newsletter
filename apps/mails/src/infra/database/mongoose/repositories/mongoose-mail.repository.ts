import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MailRepository } from '@mails/application/repositories/mail.repository';
import { Mail as MongooseMail } from '../schemas/mongoose-mail.schema';
import Mail from '@mails/application/entities/mail.entity';
import { MongooseMailMapper } from '../mappers/mongoose-mail.mapper';

@Injectable()
export class MongooseMailRepository implements MailRepository {
  constructor(
    @InjectModel(MongooseMail.name)
    private mailModel: Model<MongooseMail>,
  ) {}

  async register(mail: Mail): Promise<void> {
    const data = MongooseMailMapper.toMongoose(mail);
    await this.mailModel.create(data);
  }

  async findByEmail(email: string): Promise<Mail | null> {
    const mail = await this.mailModel.findOne({ email });
    if (!mail) return null;
    return MongooseMailMapper.toDomain(mail);
  }

  async remove(id: string): Promise<void> {
    await this.mailModel.findByIdAndDelete(id);
  }

  async findAll(): Promise<Mail[] | null> {
    const mails = await this.mailModel.find();
    return mails.map(MongooseMailMapper.toDomain);
  }

  async update(mail: Mail): Promise<void> {
    const data = MongooseMailMapper.toMongoose(mail);
    await this.mailModel.findByIdAndUpdate(mail.id, data);
  }
}

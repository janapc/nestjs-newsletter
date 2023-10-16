import { MailSchemaDocument } from '../schemas/mongoose-mail.schema';
import Mail from '@mails/application/entities/mail.entity';

export class MongooseMailMapper {
  static toMongoose(mail: Mail) {
    return {
      email: mail.email,
      content_id: mail.content_id,
      createdAt: mail.createdAt,
      updatedAt: mail.updatedAt,
    };
  }

  static toDomain(body: MailSchemaDocument): Mail {
    return new Mail(
      {
        email: body.email,
        content_id: body.content_id,
        createdAt: body.createdAt,
        updatedAt: body.updatedAt,
      },
      String(body._id),
    );
  }
}

import Content from '@contents/application/entities/content.entity';
import { ContentSchemaDocument } from '../schemas/mongoose-content.schema';

export class MongooseContentMapper {
  static toMongoose({ title, content, createdAt }: Content) {
    return {
      title,
      content,
      createdAt,
    };
  }

  static toDomain(body: ContentSchemaDocument): Content {
    return new Content(
      {
        title: body.title,
        content: body.content,
        createdAt: body.createdAt,
      },
      String(body._id),
    );
  }
}

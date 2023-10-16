import Content from '@contents/application/entities/content.entity';

export class ContentResponseMapper {
  static toHTTP(content: Content) {
    return {
      id: content.id,
      title: content.title,
      content: content.content,
      createdAt: content.createdAt,
    };
  }
}

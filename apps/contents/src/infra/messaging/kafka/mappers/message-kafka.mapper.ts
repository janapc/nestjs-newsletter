import Content from '@contents/application/entities/content.entity';

export class MessageKafkaMapper {
  static toKafka(content: Content) {
    return {
      value: JSON.stringify({
        content_id: content.id,
        title: content.title,
        body: content.content,
        createdAt: content.createdAt,
      }),
    };
  }
}

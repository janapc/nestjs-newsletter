import Content from '../entities/content.entity';

export abstract class MessagingContentRepository {
  abstract sendMessage(contents: Content[]): Promise<void>;
}

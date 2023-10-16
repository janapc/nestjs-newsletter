import Content from '@contents/application/entities/content.entity';
import { MessagingContentRepository } from '@contents/application/repositories/messaging-content.repository';

interface Message {
  value: string;
}

export class MessagingContentInMemoryRepository
  implements MessagingContentRepository
{
  public messages: Message[] = [];

  async sendMessage(contents: Content[]): Promise<void> {
    const record = contents.map((item) => ({
      value: JSON.stringify(item),
    }));
    this.messages.push(...record);
  }
}

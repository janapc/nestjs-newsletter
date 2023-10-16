import Content from '@contents/application/entities/content.entity';
import { ContentRepository } from '@contents/application/repositories/content.repository';

export class ContentInMemoryRepository implements ContentRepository {
  public contents: Content[] = [];

  async create(content: Content): Promise<void> {
    this.contents.push(content);
  }

  async findAll(): Promise<Content[]> {
    return this.contents;
  }
}

import Content from '../entities/content.entity';

export abstract class ContentRepository {
  abstract create(content: Content): Promise<void>;
  abstract findAll(): Promise<Content[]>;
}

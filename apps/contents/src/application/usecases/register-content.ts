import { Injectable } from '@nestjs/common';
import Content from '@contents/application/entities/content.entity';
import { ContentRepository } from '@contents/application/repositories/content.repository';
import { MessagingContentRepository } from '../repositories/messaging-content.repository';

interface InputRegisterContent {
  title: string;
  content: string;
}

@Injectable()
export class RegisterContent {
  constructor(
    private contentRepository: ContentRepository,
    private messagingContentRepository: MessagingContentRepository,
  ) {}

  async execute(input: InputRegisterContent) {
    const content = new Content(input);
    await this.contentRepository.create(content);
    await this.messagingContentRepository.sendMessage([content]);
  }
}

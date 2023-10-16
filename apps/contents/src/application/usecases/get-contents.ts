import { Injectable } from '@nestjs/common';
import { ContentRepository } from '../repositories/content.repository';

@Injectable()
export class GetContents {
  constructor(private contentRepository: ContentRepository) {}

  async execute() {
    const contents = await this.contentRepository.findAll();

    return { contents };
  }
}

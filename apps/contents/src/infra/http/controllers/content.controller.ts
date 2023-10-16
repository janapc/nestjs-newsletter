import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterContent } from '@contents/application/usecases/register-content';
import { GetContents } from '@contents/application/usecases/get-contents';
import { RegisteContentDto } from '../dtos/register-content.dto';
import { ContentResponseMapper } from '../mappers/content-response.mapper';

@Controller('content')
export class ContentController {
  constructor(
    private registerContent: RegisterContent,
    private getContents: GetContents,
  ) {}

  @Post()
  async register(@Body() body: RegisteContentDto) {
    const { title, content } = body;
    await this.registerContent.execute({ title, content });
  }

  @Get()
  async listContents() {
    const { contents } = await this.getContents.execute();
    return {
      contents: contents.map(ContentResponseMapper.toHTTP),
      count: contents.length,
    };
  }
}

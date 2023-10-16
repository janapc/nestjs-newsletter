import { ContentController } from './content.controller';
import { ContentInMemoryRepository } from '@contents-test/repositories/content-in-memory.repository';
import { RegisterContent } from '@contents/application/usecases/register-content';
import { GetContents } from '@contents/application/usecases/get-contents';
import { MessagingContentInMemoryRepository } from '@contents-test/repositories/messaging-content-in-memory.repository';

describe('ContentController', () => {
  let contentController: ContentController;
  let inMemoryRepository: ContentInMemoryRepository;
  let messagingInMemoryRepository: MessagingContentInMemoryRepository;

  beforeEach(() => {
    inMemoryRepository = new ContentInMemoryRepository();
    messagingInMemoryRepository = new MessagingContentInMemoryRepository();
    const registerContent = new RegisterContent(
      inMemoryRepository,
      messagingInMemoryRepository,
    );
    const getContents = new GetContents(inMemoryRepository);
    contentController = new ContentController(registerContent, getContents);
  });

  describe('register router', () => {
    it('should register a content', async () => {
      await contentController.register({
        title: 'banana',
        content: 'banana banana',
      });
      expect(inMemoryRepository.contents).toHaveLength(1);
      expect(inMemoryRepository.contents).toEqual(
        expect.arrayContaining([expect.objectContaining({ title: 'banana' })]),
      );
    });
  });

  describe('get contents router', () => {
    it('should list all contents', async () => {
      await contentController.register({
        title: 'test-1',
        content: 'test test',
      });
      await contentController.register({
        title: 'test-2',
        content: 'test test test',
      });
      const response = await contentController.listContents();
      expect(response.count).toEqual(2);
      expect(response.contents).toHaveLength(2);
    });
  });
});

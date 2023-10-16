import { ContentInMemoryRepository } from '@contents-test/repositories/content-in-memory.repository';
import { RegisterContent } from './register-content';
import { MessagingContentInMemoryRepository } from '@contents-test/repositories/messaging-content-in-memory.repository';

describe('Register Content UseCase', () => {
  let inMemoryRepository: ContentInMemoryRepository;
  let inMemoryMessageRepository: MessagingContentInMemoryRepository;

  beforeAll(() => {
    inMemoryRepository = new ContentInMemoryRepository();
    inMemoryMessageRepository = new MessagingContentInMemoryRepository();
  });

  it('should be able to register a content', async () => {
    const registerContent = new RegisterContent(
      inMemoryRepository,
      inMemoryMessageRepository,
    );
    await registerContent.execute({
      title: 'hello world',
      content: 'banana banana',
    });
    expect(inMemoryRepository.contents).toHaveLength(1);
    expect(inMemoryMessageRepository.messages).toHaveLength(1);
  });
});

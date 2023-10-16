import { ContentInMemoryRepository } from '@contents-test/repositories/content-in-memory.repository';
import { GetContents } from './get-contents';
import Content from '../entities/content.entity';

describe('Get Contents UseCase', () => {
  let inMemoryRepository: ContentInMemoryRepository;

  beforeAll(() => {
    inMemoryRepository = new ContentInMemoryRepository();
    inMemoryRepository.create(
      new Content({
        title: 'hello world',
        content: 'banana banana',
      }),
    );
  });

  it('should be able to list contents', async () => {
    const getContents = new GetContents(inMemoryRepository);
    const response = await getContents.execute();
    expect(response.contents).toHaveLength(1);
  });
});

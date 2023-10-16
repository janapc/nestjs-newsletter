import { SubscriberInMemoryRepository } from '@subscribers-test/repositories/subscriber-in-memory-repository';
import { GetActiveSubscribers } from './get-active-subscribers';
import Subscriber from '../entities/subscriber.entity';

describe('Get Active Subscribers UseCase', () => {
  let inMemoryRepository: SubscriberInMemoryRepository;

  beforeAll(() => {
    inMemoryRepository = new SubscriberInMemoryRepository();
    inMemoryRepository.create(new Subscriber({ email: 'test@test.com' }));
    inMemoryRepository.create(new Subscriber({ email: 'banana@banana.com' }));
  });

  it('should list all active subscribers', async () => {
    const getActiveSubscribers = new GetActiveSubscribers(inMemoryRepository);
    const response = await getActiveSubscribers.execute();
    expect(response.subscribers).toHaveLength(2);
  });
});

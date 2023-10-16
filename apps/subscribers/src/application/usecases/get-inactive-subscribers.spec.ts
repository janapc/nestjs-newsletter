import { SubscriberInMemoryRepository } from '@subscribers-test/repositories/subscriber-in-memory-repository';
import Subscriber from '../entities/subscriber.entity';
import { GetInactiveSubscribers } from './get-inactive-subscribers';

describe('Get Inactive Subscribers UseCase', () => {
  let inMemoryRepository: SubscriberInMemoryRepository;

  beforeAll(() => {
    inMemoryRepository = new SubscriberInMemoryRepository();
    inMemoryRepository.create(new Subscriber({ email: 'test@test.com' }));
    inMemoryRepository.create(
      new Subscriber({
        email: 'banana@banana.com',
        unsubscriberAt: new Date(),
      }),
    );
  });

  it('should list all inactive subscribers', async () => {
    const getInactiveSubscribers = new GetInactiveSubscribers(
      inMemoryRepository,
    );
    const response = await getInactiveSubscribers.execute();
    expect(response.subscribers).toHaveLength(1);
    expect(response.subscribers[0].email).toEqual('banana@banana.com');
  });
});

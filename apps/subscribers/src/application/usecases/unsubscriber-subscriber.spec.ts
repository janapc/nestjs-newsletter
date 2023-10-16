import { SubscriberInMemoryRepository } from '@subscribers-test/repositories/subscriber-in-memory-repository';
import { UnsubscribeSubscriber } from './unsubscribe-subscriber';
import Subscriber from '../entities/subscriber.entity';
import { MessagingSubscriberInMemoryRepository } from '@subscribers-test/repositories/messaging-subscriber-in-memory.repository';

describe('Unsubscribe Subscriber UseCase', () => {
  let inMemoryRepository: SubscriberInMemoryRepository;
  let messagingSubscriberInMemoryRepository: MessagingSubscriberInMemoryRepository;

  beforeAll(() => {
    inMemoryRepository = new SubscriberInMemoryRepository();
    messagingSubscriberInMemoryRepository =
      new MessagingSubscriberInMemoryRepository();
  });

  it('should be able to a unsubscriber', async () => {
    const subscriber = new Subscriber({ email: 'test@banana.com' });
    inMemoryRepository.create(subscriber);
    expect(inMemoryRepository.subscribers).toHaveLength(1);

    const unsubscribeSubscriber = new UnsubscribeSubscriber(
      inMemoryRepository,
      messagingSubscriberInMemoryRepository,
    );
    await unsubscribeSubscriber.execute(subscriber.id);
    expect(inMemoryRepository.subscribers[0].unsubscriberAt).toEqual(
      expect.any(Date),
    );
    expect(messagingSubscriberInMemoryRepository.messages).toHaveLength(1);
  });

  it('should not unsubscribe if not found a subscriber', async () => {
    const unsubscribeSubscriber = new UnsubscribeSubscriber(
      inMemoryRepository,
      messagingSubscriberInMemoryRepository,
    );
    expect(() => {
      return unsubscribeSubscriber.execute('test-1');
    }).rejects.toThrow();
  });
});

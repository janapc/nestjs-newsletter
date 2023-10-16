import { SubscriberInMemoryRepository } from '@subscribers-test/repositories/subscriber-in-memory-repository';
import { RegisterSubscriber } from './register-subscriber';
import { MessagingSubscriberInMemoryRepository } from '@subscribers-test/repositories/messaging-subscriber-in-memory.repository';

describe('Register Subscriber UseCase', () => {
  let inMemoryRepository: SubscriberInMemoryRepository;
  let messagingSubscriberInMemoryRepository: MessagingSubscriberInMemoryRepository;

  beforeAll(() => {
    inMemoryRepository = new SubscriberInMemoryRepository();
    messagingSubscriberInMemoryRepository =
      new MessagingSubscriberInMemoryRepository();
  });

  it('should be able to register a subscriber', async () => {
    const registerSubscribe = new RegisterSubscriber(
      inMemoryRepository,
      messagingSubscriberInMemoryRepository,
    );
    await registerSubscribe.execute({ email: 'test@banana.com' });
    expect(inMemoryRepository.subscribers).toHaveLength(1);
    expect(messagingSubscriberInMemoryRepository.messages).toHaveLength(1);
  });

  it('should not register a subscriber with email already registered', async () => {
    const registerSubscribe = new RegisterSubscriber(
      inMemoryRepository,
      messagingSubscriberInMemoryRepository,
    );
    expect(() => {
      return registerSubscribe.execute({ email: 'test@banana.com' });
    }).rejects.toThrowError('subscriber has registed');
  });
});

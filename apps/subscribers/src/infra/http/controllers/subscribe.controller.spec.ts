import { SubscriberInMemoryRepository } from '@subscribers-test/repositories/subscriber-in-memory-repository';
import { SubscriberController } from './subscriber.controller';
import { RegisterSubscriber } from '@subscribers/application/usecases/register-subscriber';
import { UnsubscribeSubscriber } from '@subscribers/application/usecases/unsubscribe-subscriber';
import { GetActiveSubscribers } from '@subscribers/application/usecases/get-active-subscribers';
import { GetInactiveSubscribers } from '@subscribers/application/usecases/get-inactive-subscribers';
import { MessagingSubscriberInMemoryRepository } from '@subscribers-test/repositories/messaging-subscriber-in-memory.repository';

describe('SubscriberController', () => {
  let subscriberController: SubscriberController;
  let inMemoryRepository: SubscriberInMemoryRepository;
  let messagingSubscriberInMemoryRepository: MessagingSubscriberInMemoryRepository;

  beforeEach(() => {
    inMemoryRepository = new SubscriberInMemoryRepository();
    messagingSubscriberInMemoryRepository =
      new MessagingSubscriberInMemoryRepository();
    const registerSubscriber = new RegisterSubscriber(
      inMemoryRepository,
      messagingSubscriberInMemoryRepository,
    );
    const unsubscribeSubscriber = new UnsubscribeSubscriber(
      inMemoryRepository,
      messagingSubscriberInMemoryRepository,
    );
    const getActiveSubscribers = new GetActiveSubscribers(inMemoryRepository);
    const getInactiveSubscribers = new GetInactiveSubscribers(
      inMemoryRepository,
    );
    subscriberController = new SubscriberController(
      registerSubscriber,
      unsubscribeSubscriber,
      getActiveSubscribers,
      getInactiveSubscribers,
    );
  });

  describe('register router', () => {
    it('should register a subscriber', async () => {
      await subscriberController.register({ email: 'test@test.com' });
      expect(inMemoryRepository.subscribers).toHaveLength(1);
      expect(inMemoryRepository.subscribers).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ email: 'test@test.com' }),
        ]),
      );

      expect(messagingSubscriberInMemoryRepository.messages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            topic: 'register-subscriber-topic',
            value: JSON.stringify({ email: 'test@test.com' }),
          }),
        ]),
      );
    });
  });

  describe('unsubscribe router', () => {
    it('should unsubscribe a subscriber', async () => {
      await subscriberController.register({ email: 'test@test.com' });
      await subscriberController.unsubscriber(
        inMemoryRepository.subscribers[0].id,
      );
      expect(inMemoryRepository.subscribers[0].unsubscriberAt).toEqual(
        expect.any(Date),
      );
      expect(messagingSubscriberInMemoryRepository.messages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            topic: 'remove-subscriber-topic',
            value: JSON.stringify({ email: 'test@test.com' }),
          }),
        ]),
      );
    });
  });

  describe('get active subscribers router', () => {
    it('should return list of active subscribers', async () => {
      await subscriberController.register({ email: 'test@test.com' });
      await subscriberController.register({ email: 'banana@banana.com' });
      const subscribers = await subscriberController.activeSubscribers();
      expect(subscribers.subscribers).toHaveLength(2);
      expect(subscribers.count).toEqual(2);
    });
  });

  describe('get inactive subscribers router', () => {
    it('should return list of inactive subscribers', async () => {
      await subscriberController.register({ email: 'test@test.com' });
      await subscriberController.register({ email: 'banana@banana.com' });
      const unsubscriber = inMemoryRepository.subscribers[0];
      await subscriberController.unsubscriber(unsubscriber.id);
      const subscribers = await subscriberController.inactiveSubscribers();
      expect(subscribers.subscribers).toHaveLength(1);
      expect(subscribers.subscribers[0].email).toEqual(unsubscriber.email);
      expect(subscribers.count).toEqual(1);
    });
  });
});

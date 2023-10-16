import Subscriber from './subscriber.entity';

describe('Subscriber Entity', () => {
  it('should be able to create a subscriber', () => {
    const subscriber = new Subscriber({ email: 'test@test.com' });
    expect(subscriber).toBeTruthy();
  });
});

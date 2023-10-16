import Notification from './notification.entity';

describe('Notification Entity', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      subject: 'test',
      body: 'testing',
      from: 'test@test.com',
      to: 'banana@banana.com',
    });
    expect(notification).toBeTruthy();
  });
});

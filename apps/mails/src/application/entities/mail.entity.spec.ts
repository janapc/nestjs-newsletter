import Mail from './mail.entity';

describe('Mail Entity', () => {
  it('should be able to create a mail', () => {
    const mail = new Mail({
      email: 'test@test.com',
    });
    expect(mail).toBeTruthy();
  });
});

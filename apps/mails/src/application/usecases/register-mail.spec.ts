import { MailInMemoryRepository } from '@mails-test/repositories/mail-in-memory.repository';
import { RegisterMail } from './register-mail';

describe('Register Mail Usecase', () => {
  let registerMail: RegisterMail;
  let mailInMemoryRepository: MailInMemoryRepository;

  beforeEach(() => {
    mailInMemoryRepository = new MailInMemoryRepository();
    registerMail = new RegisterMail(mailInMemoryRepository);
  });
  it('should register a mail', async () => {
    await registerMail.execute('test-test@mail.com');
    expect(mailInMemoryRepository.mails).toHaveLength(1);
  });
});

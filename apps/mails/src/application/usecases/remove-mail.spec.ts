import { MailInMemoryRepository } from '@mails-test/repositories/mail-in-memory.repository';
import Mail from '../entities/mail.entity';
import { RemoveMail } from './remove-mail';

describe('Remove Mail Usecase', () => {
  let removeMail: RemoveMail;
  let mailInMemoryRepository: MailInMemoryRepository;

  beforeEach(() => {
    mailInMemoryRepository = new MailInMemoryRepository();
    removeMail = new RemoveMail(mailInMemoryRepository);
  });

  it('should remove a mail', async () => {
    mailInMemoryRepository.register(new Mail({ email: 'test-test@mail.com' }));
    mailInMemoryRepository.register(new Mail({ email: 'mail-mail@mail.com' }));
    await removeMail.execute('test-test@mail.com');
    expect(mailInMemoryRepository.mails).toHaveLength(1);
    expect(mailInMemoryRepository.mails[0].email).toEqual('mail-mail@mail.com');
  });

  it('should throw a error if do not exists email', async () => {
    expect(async () => {
      await removeMail.execute('test-test@mail.com');
    }).rejects.toThrowError('Email not found');
  });
});

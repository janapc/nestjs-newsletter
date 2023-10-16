import { MailInMemoryRepository } from '@mails-test/repositories/mail-in-memory.repository';
import { NotificationInMemoryRepository } from '@mails-test/repositories/notification-in-memory.repository';
import { SendMails } from './send-mails';
import Mail from '../entities/mail.entity';

describe('Send Mail Usecase', () => {
  let sendMails: SendMails;
  let mailInMemoryRepository: MailInMemoryRepository;
  let notificationInMemoryRepository: NotificationInMemoryRepository;

  beforeEach(() => {
    process.env.MAIL_FROM = 'test@test.com.br';
    notificationInMemoryRepository = new NotificationInMemoryRepository();
    mailInMemoryRepository = new MailInMemoryRepository();
    sendMails = new SendMails(
      mailInMemoryRepository,
      notificationInMemoryRepository,
    );
  });

  it('should send mails', async () => {
    mailInMemoryRepository.register(new Mail({ email: 'test-test@mail.com' }));
    mailInMemoryRepository.register(new Mail({ email: 'mail-mail@mail.com' }));
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await sendMails.execute({
      body: 'testing',
      title: 'Banana',
      content_id: '123-1js93-123',
    });
    expect(notificationInMemoryRepository.notifications).toEqual([
      {
        props: {
          body: 'testing',
          from: 'test@test.com.br',
          subject: 'Banana',
          to: 'test-test@mail.com,mail-mail@mail.com',
        },
      },
    ]);
  });

  it('should throw a error if do not exists emails', async () => {
    expect(async () => {
      await sendMails.execute({
        body: 'testing',
        title: 'Banana',
        content_id: '123-1js93-123',
      });
    }).rejects.toThrow();
  });
});

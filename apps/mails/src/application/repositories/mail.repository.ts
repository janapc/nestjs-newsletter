import Mail from '../entities/mail.entity';

export abstract class MailRepository {
  abstract register(mail: Mail): Promise<void>;
  abstract findByEmail(email: string): Promise<Mail | null>;
  abstract remove(id: string): Promise<void>;
  abstract findAll(): Promise<Mail[] | null>;
  abstract update(mail: Mail): Promise<void>;
}

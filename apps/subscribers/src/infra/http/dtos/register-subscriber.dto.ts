import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterSubscriberDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

import { IsNotEmpty } from 'class-validator';

export class RegisteContentDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}

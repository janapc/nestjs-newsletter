import { randomUUID } from 'node:crypto';
import { OptionalProps } from '../../helpers/OptionalProps';

export interface MailProps {
  email: string;
  content_id: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default class Mail {
  private _id: string;
  private props: MailProps;

  constructor(
    props: OptionalProps<MailProps, 'createdAt' | 'updatedAt' | 'content_id'>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      content_id: props.content_id ?? null,
    };
  }

  public get id(): string {
    return this._id;
  }

  public get email(): string {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get content_id(): string | null {
    return this.props.content_id;
  }

  public set content_id(content_id: string) {
    this.props.content_id = content_id;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public updateDate() {
    this.props.updatedAt = new Date();
  }
}

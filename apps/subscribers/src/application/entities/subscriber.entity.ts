import { randomUUID } from 'node:crypto';
import { OptionalProps } from '../../helpers/OptionalProps';

export interface SubscriberProps {
  email: string;
  unsubscriberAt?: Date | null;
  createdAt: Date;
}

export default class Subscriber {
  private _id: string;
  private props: SubscriberProps;

  constructor(props: OptionalProps<SubscriberProps, 'createdAt'>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = { ...props, createdAt: props.createdAt ?? new Date() };
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

  public get unsubscriberAt(): Date | null | undefined {
    return this.props.unsubscriberAt;
  }

  public unsubscribe() {
    this.props.unsubscriberAt = new Date();
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}

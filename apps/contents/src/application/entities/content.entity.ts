import { randomUUID } from 'node:crypto';
import { OptionalProps } from '../../helpers/OptionalProps';

export interface ContentProps {
  title: string;
  content: string;
  createdAt: Date;
}

export default class Content {
  private props: ContentProps;
  private _id: string;

  constructor(props: OptionalProps<ContentProps, 'createdAt'>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = { ...props, createdAt: props.createdAt ?? new Date() };
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this.props.title;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get content(): string {
    return this.props.content;
  }

  public set content(content: string) {
    this.props.content = content;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}

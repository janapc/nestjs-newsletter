export interface NotificationProps {
  from: string;
  subject: string;
  body: string;
  to: string;
}

export default class Notification {
  private props: NotificationProps;

  constructor(props: NotificationProps) {
    this.props = props;
  }

  public get from(): string {
    return this.props.from;
  }

  public set from(from: string) {
    this.props.from = from;
  }

  public get subject(): string {
    return this.props.subject;
  }

  public set subject(subject: string) {
    this.props.subject = subject;
  }

  public get body(): string {
    return this.props.body;
  }

  public set body(body: string) {
    this.props.body = body;
  }

  public get to(): string {
    return this.props.to;
  }

  public set to(to: string) {
    this.props.to = to;
  }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MailSchemaDocument = HydratedDocument<Mail>;

@Schema()
export class Mail {
  @Prop({ required: true })
  email: string;

  @Prop()
  content_id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const MailSchema = SchemaFactory.createForClass(Mail);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContentSchemaDocument = HydratedDocument<Content>;

@Schema()
export class Content {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  createdAt: Date;
}

export const ContentSchema = SchemaFactory.createForClass(Content);

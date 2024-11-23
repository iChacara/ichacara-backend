import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop()
  userId: number;

  @Prop()
  event: string;

  @Prop({ default: Date.now(), required: false })
  createdAt?: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);

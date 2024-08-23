import { randomUUID } from 'crypto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { HydratedDocument } from 'mongoose';

import { User } from './user';

const userType = ['primaryUserName', 'secondaryUserName'];

export type ConversationDocument = HydratedDocument<Conversation>;

@Schema()
export class Conversation {
  @Prop({ required: true, ref: 'User', type: mongoose.Schema.Types.ObjectId })
  primaryUserName: User;

  @Prop({ required: true, ref: 'User', type: mongoose.Schema.Types.ObjectId })
  secondaryUserName: User;

  @Prop({ default: () => randomUUID() })
  id: string;

  @Prop([
    {
      sentBy: { type: String, enum: userType },
      sentTo: { type: String, enum: userType },
      message: { type: String },
      sentAt: { type: Date, default: Date.now }
    }
  ])
  messages: {
    sentBy: string;
    sentTo: string;
    message: string;
    sentAt: Date;
  }[];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);

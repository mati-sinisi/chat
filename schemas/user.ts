import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';
import { IsEmail, IsNotEmpty, IsStrongPassword, IsUrl } from 'class-validator';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Prop({ required: true })
  name: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @Prop({ required: true })
  password: string;

  @IsUrl()
  photo: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

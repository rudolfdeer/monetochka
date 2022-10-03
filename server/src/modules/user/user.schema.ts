import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
interface Category {
  id: string;
  name: string;
  expenses: number;
  icon: string;
  color: string;
}

export interface IUser {
  _id: string;
  email: string;
  password: number;
  categories: Category[];
}

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  categories: Category[];
}

export const UserSchema = SchemaFactory.createForClass(User);

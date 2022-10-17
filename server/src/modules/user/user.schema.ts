import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
interface Category {
  id: string;
  name: string;
  expenses: number;
  icon: string;
  color: string;
}

interface SharedExpense {
  id: string;
  senderEmail: string;
  amount: number;
  currency: string;
}

export interface IUser {
  _id: string;
  email: string;
  password: string;
  currency: string;
  categories: Category[];
  shared: SharedExpense[];
}

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  currency: string;

  @Prop()
  categories: Category[];

  @Prop()
  shared: SharedExpense[];
}

export const UserSchema = SchemaFactory.createForClass(User);

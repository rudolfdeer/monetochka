import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
interface Category {
  name: string;
  expenses: number;
  icon: string;
  color: string;
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

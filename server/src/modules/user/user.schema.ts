import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from '../categories/category.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  // categories: Category[];
}

export const UserSchema = SchemaFactory.createForClass(User);

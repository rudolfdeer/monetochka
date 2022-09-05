import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async createUser(email: string, password: string) {
    const newUser = new this.userModel({
      email,
      password,
    });
    const result = await newUser.save();
    return result;
  }
}

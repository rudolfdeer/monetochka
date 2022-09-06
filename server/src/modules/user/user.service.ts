import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { comparePasswords } from '../../utils/auth/comparePassword.util';
import { encryptPassword } from '../../utils/auth/encryptPassword.util';
import { mock } from '../../constants/categoriesDefault';
import { User, UserDocument } from './user.schema';
import { HTTP_MESSAGES } from '../../constants/httpMessages';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new Error(HTTP_MESSAGES.NOT_FOUND);
    return user;
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user && comparePasswords(password, user.password)) {
      return user;
    } else {
      throw new Error(HTTP_MESSAGES.INCORRECT_CREDENTIALS);
    }
  }

  async createUser(email: string, password: string) {
    const userInDb = await this.userModel.findOne({ email });

    if (userInDb) {
      throw new Error(HTTP_MESSAGES.ALREASY_EXISTS);
    }

    const hashedPassword = encryptPassword(password);

    const newUser = new this.userModel({
      email,
      password: hashedPassword,
      categories: mock,
    });
    const result = await newUser.save();
    return result;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { comparePasswords } from '../../utils/auth/comparePassword.util';
import { encryptPassword } from '../../utils/auth/encryptPassword.util';
import { COLORS, mock } from '../../constants/categoriesDefault';
import { User, UserDocument } from './user.schema';
import { HTTP_MESSAGES } from '../../constants/httpMessages';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new Error(HTTP_MESSAGES.USER_NOT_FOUND);
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new Error(HTTP_MESSAGES.USER_NOT_FOUND);
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
      throw new Error(HTTP_MESSAGES.ALREADY_EXISTS);
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

  async changeCategory(
    userId: string,
    categoryId: string,
    color: string,
    icon: string,
    expenses: number,
    name: string,
  ) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new Error(HTTP_MESSAGES.USER_NOT_FOUND);

    const category = user.categories.find(
      (category) => category.id === categoryId,
    );
    if (!category) throw new Error(HTTP_MESSAGES.CATEGORY_NOT_FOUND);

    const updatedCategory = {
      ...category,
      color,
      icon,
      expenses,
      name,
    };

    const index = user.categories.indexOf(category);

    const updatedCategories = [
      ...user.categories.slice(0, index),
      updatedCategory,
      ...user.categories.slice(index + 1),
    ];

    await this.userModel.updateOne(
      { _id: userId },
      { $set: { categories: updatedCategories } },
    );

    const updatedUser = await this.getUser(userId);
    return updatedUser;
  }

  async createCategory(userId: string, categoryName: string) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new Error(HTTP_MESSAGES.USER_NOT_FOUND);

    const newCategory = {
      id: uuidv4(),
      name: categoryName,
      expenses: 0,
      icon: '',
      color: COLORS.BLACK,
    };

    const updatedCategories = [...user.categories, newCategory];

    await this.userModel.updateOne(
      { _id: userId },
      { $set: { categories: updatedCategories } },
    );

    const updatedUser = await this.getUser(userId);
    return updatedUser;
  }

  async deleteCategory(userId: string, categoryId: string) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new Error(HTTP_MESSAGES.USER_NOT_FOUND);

    const category = user.categories.find((cat) => cat.id === categoryId);
    if (!category) throw new Error(HTTP_MESSAGES.CATEGORY_NOT_FOUND);

    const updatedCategories = user.categories.filter(
      (cat) => cat.id !== categoryId,
    );

    await this.userModel.updateOne(
      { _id: userId },
      { $set: { categories: updatedCategories } },
    );

    const updatedUser = await this.getUser(userId);
    return updatedUser;
  }

  async shareExpenses(userId: string, email: string, sum: number) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new Error(HTTP_MESSAGES.USER_NOT_FOUND);

    const category = user.categories.find(
      (category) => category.name === 'unsorted',
    );
    if (!category) {
      const newCategory = {
        id: uuidv4(),
        name: 'unsorted',
        expenses: sum,
        icon: '',
        color: COLORS.BLACK,
      };
      user.categories.unshift(newCategory);
      const updatedCategories = [...user.categories];

      await this.userModel.updateOne(
        { _id: user._id },
        { $set: { categories: updatedCategories } },
      );
    } else {
      const updatedCategory = {
        ...category,
      };

      updatedCategory.expenses = category.expenses + sum;

      const index = user.categories.indexOf(category);
      const updatedCategories = [
        ...user.categories.slice(0, index),
        updatedCategory,
        ...user.categories.slice(index + 1),
      ];

      await this.userModel.updateOne(
        { _id: user._id },
        { $set: { categories: updatedCategories } },
      );
    }
    const updatedUser = await this.getUser(user._id);
    return updatedUser;
  }
}

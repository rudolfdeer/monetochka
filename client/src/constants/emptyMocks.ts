import { COLORS } from '../styles/colors';
import { Category, User } from './interfaces';

export const emptyCategory: Category = {
  id: '0',
  name: '',
  expenses: 0,
  icon: '',
  color: COLORS.BLACK,
};

export const emptyUser: User = {
  _id: '',
  email: '',
  password: '',
  categories: [],
};

import { COLORS } from '../styles/colors';

export interface ICategory {
  id: string;
  name: string;
  expenses: number;
  icon: string;
  color: string;
}

export interface IUser {
  _id: string;
  email: string;
  password: string;
  categories: ICategory[];
}

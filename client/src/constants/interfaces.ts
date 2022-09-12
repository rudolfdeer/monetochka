export interface Category {
  id: string;
  name: string;
  expenses: number;
  icon: string;
  color: string;
}

export interface User {
  _id: string;
  email: string;
  password: string;
  categories: Category[];
}

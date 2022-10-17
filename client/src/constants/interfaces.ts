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
  currency: string;
  categories: Category[];
  shared: SharedExpense[];
}
export interface SharedExpense {
  id: string;
  senderEmail: string;
  amount: number;
  currency: string;
}
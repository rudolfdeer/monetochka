export interface Category {
  id?: number;
  name: string;
  expenses: number;
}

export const emptyCategory = {
  id: 0,
  name: '',
  expenses: 0,
}

export const defaultCategories: Category[] = [
  {
    id: 1,
    name: 'Home',
    expenses: 0,
  },
  {
    id: 2,
    name: 'Food outside',
    expenses: 0,
  },
  {
    id: 3,
    name: 'Other',
    expenses: 0,
  },
];

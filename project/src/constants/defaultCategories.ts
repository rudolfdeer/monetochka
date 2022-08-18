export interface Category {
  id: number;
  name: string;
  expenses: number;
}

export const defaultCategories: Category[] = [
  {
    id: 1,
    name: '',
    expenses: 0,
  },
  {
    id: 2,
    name: 'home',
    expenses: 0,
  },
  {
    id: 3,
    name: 'food outside',
    expenses: 0,
  },
  {
    id: 4,
    name: 'other',
    expenses: 0,
  },
];

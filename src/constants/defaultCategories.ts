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
  {
    id: 4,
    name: 'Activities',
    expenses: 0,
  },
  {
    id: 5,
    name: 'Meal',
    expenses: 0,
  },
  {
    id: 6,
    name: 'Shopping',
    expenses: 0,
  },
  {
    id: 7,
    name: 'Bills',
    expenses: 0,
  },
  {
    id: 8,
    name: 'Subscriptions',
    expenses: 0,
  },
  {
    id: 9,
    name: 'Cars',
    expenses: 0,
  },
  {
    id: 10,
    name: 'Pets',
    expenses: 0,
  },
  {
    id: 11,
    name: 'Health',
    expenses: 0,
  },
  {
    id: 12,
    name: 'Beauty',
    expenses: 0,
  },
  {
    id: 13,
    name: 'Travel',
    expenses: 0,
  },
];

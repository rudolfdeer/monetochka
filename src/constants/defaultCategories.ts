export interface Category {
  id: string;
  name: string;
  expenses: number;
  icon: string;
}

export const emptyCategory = {
  id: '0',
  name: '',
  expenses: 0,
  icon: '',
}

export const defaultCategories: Category[] = [
  {
    id: '1',
    name: 'Home',
    expenses: 0,
    icon: '',
  },
  {
    id: '2',
    name: 'Food outside',
    expenses: 0,
    icon: '',
  },
  {
    id: '3',
    name: 'Other',
    expenses: 0,
    icon: '',
  },
  {
    id: '4',
    name: 'Activities',
    expenses: 0,
    icon: '',
  },
  {
    id: '5',
    name: 'Meal',
    expenses: 0,
    icon: '',
  },
  {
    id: '6',
    name: 'Shopping',
    expenses: 0,
    icon: '',
  },
  {
    id: '7',
    name: 'Bills',
    expenses: 0,
    icon: '',
  },
  {
    id: '8',
    name: 'Subscriptions',
    expenses: 0,
    icon: '',
  },
  {
    id: '9',
    name: 'Cars',
    expenses: 0,
    icon: '',
  },
  {
    id: '10',
    name: 'Pets',
    expenses: 0,
    icon: '',
  },
  {
    id: '11',
    name: 'Health',
    expenses: 0,
    icon: '',
  },
  {
    id: '12',
    name: 'Beauty',
    expenses: 0,
    icon: '',
  },
  {
    id: '13',
    name: 'Travel',
    expenses: 0,
    icon: '',
  },
];

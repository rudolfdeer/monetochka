// export const defaultCategories = ['home', 'food outside', 'other'];

export interface Category {
  id: number,
  name: string,
  expenses: number
}


export const defaultCategories: Category[] = [
  {
    id: 1,
    name: 'home',
    expenses: 0
  },
  {
    id: 2,
    name: 'food outside',
    expenses: 0
  },
  {
    id: 3,
    name: 'other',
    expenses: 0
  },
]
import { FormikValues } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import {
  Category,
  defaultCategories,
  emptyCategory,
} from '../constants/defaultCategories';

export const addExpensesToCategory = (
  values: FormikValues,
  categories: Category[]
) => {
  const category =
    categories.find((el) => el.name === values.category) || emptyCategory;

  category.expenses = category.expenses + Number(values.sum);

  const newCategories = categories.map((el) => {
    if (el.id === category.id) {
      el = category;
    }
    return el;
  });

  return newCategories;
};

export const addNewCategory = (
  values: FormikValues,
  categories: Category[]
) => {
  const category = defaultCategories.find((el) => el.name === values.category);

  if (category) return;

  const newCategory = {
    name: values.name,
    expenses: 0,
    id: uuidv4(),
    icon: '',
  };

  const newCategories = [...categories];
  newCategories.unshift(newCategory);

  console.log(newCategories);

  return newCategories;
};

export const getCategoryById = (id: string, categories: Category[]) => {
  const category = categories.find((el) => el.id === id);

  return category;
}

export const changeIcon = (id: string, icon: string, categories: Category[]) => {
  const category = categories.find((el) => el.id === id);

  if(!category) return;

  category.icon = icon;

  const newCategories = categories.map((el) => {
    if (el.id === category.id) {
      el = category;
    }
    return el;
  });

  return newCategories;
}
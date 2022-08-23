import { FormikValues } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import {
  defaultCategories,
  emptyCategory,
} from '../constants/defaultCategories';

export const addExpensesToCategory = (values: FormikValues) => {
  const category =
    defaultCategories.find((el) => el.name === values.category) ||
    emptyCategory;

  category.expenses = category.expenses + Number(values.sum);

  const newCategories = defaultCategories.map((el) => {
    if (el.id === category.id) {
      el = category;
    }
    return el;
  });

  return newCategories;
};

export const addNewCategory = (values: FormikValues) => {
  const category =
  defaultCategories.find((el) => el.name === values.category);

  // add span to handle errors
  if (!category) return;

  const newCategory = {
    name: values.title,
    expenses: 0,
    id: uuidv4(),
  }

  defaultCategories.push(newCategory);

  return defaultCategories;
}
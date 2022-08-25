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
  const category = defaultCategories.find((el) => el.name === values.category) || emptyCategory;
  category.expenses = Number((category.expenses + parseFloat(values.sum)).toFixed(3));



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
  };

  const newCategories = [...categories];
  newCategories.unshift(newCategory);

  console.log(newCategories);

  return newCategories;
};

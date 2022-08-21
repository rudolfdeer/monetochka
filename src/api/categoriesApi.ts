import { FormikValues } from 'formik';
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

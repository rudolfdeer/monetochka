import { Category } from '../constants/interfaces';
import { apiBase } from '../constants/server';

export const getUser = async (id: string) => {
  const response = await fetch(`${apiBase}/${id}`);
  const result = await response.json();
  if (result.message) {
    throw new Error(result.message);
  }
  return result;
};

export const signIn = async (email: string, password: string) => {
  const body = { email, password };

  const response = await fetch(`${apiBase}/sign-in`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  const result = await response.json();
  if (result.message) {
    throw new Error(result.message);
  }
  return result;
};

export const changeCategory = async (userId: string, category: Category) => {
  const body = { ...category };

  const response = await fetch(`${apiBase}/${userId}/category/${category.id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  if (result.message) {
    throw new Error(result.message);
  }
  return result;
};

export const createCategory = async (userId: string, categoryName: string) => {
  const body = {
    name: categoryName,
  };

  const response = await fetch(`${apiBase}/${userId}/category`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  if (result.message) {
    throw new Error(result.message);
  }
  return result;
};

export const signUp = async (email: string, password: string) => {
  const body = { email, password };

  const response = await fetch(`${apiBase}/sign-up`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  if (result.message) {
    throw new Error(result.message);
  }
  return result;
};

export const deleteCategory = async (userId: string, categoryId: string) => {
  const response = await fetch(`${apiBase}/${userId}/category/${categoryId}`, {
    method: 'DELETE',
  });
  const result = await response.json();
  if (result.message) {
    throw new Error(result.message);
  }
  return result;
};

export const shareExpense = async (
  userId: string,
  email: string,
  sum: number
) => {
  const body = {
    email,
    sum,
  };
  const response = await fetch(`${apiBase}/${userId}/share`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();

  if (result.message) {
    throw new Error(result.message);
  }
  return result;
};

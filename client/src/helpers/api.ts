import { ICategory } from '../constants/interfaces';

const base = 'http://127.0.0.1:3000/api/user';

export const getUser = async (id: string) => {
  const response = await fetch(`${base}/${id}`);
  const result = await response.json();
  if (result.message) {
    throw new Error(result.message);
  }
  return result;
};

export const signIn = async (email: string, password: string) => {
  const body = { email, password };

  const response = await fetch(`${base}/sign-in`, {
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

export const changeCategory = async (userId: string, category: ICategory) => {
  const body = { ...category };

  const response = await fetch(`${base}/${userId}/category/${category.id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  console.log(response, result);
  if (result.message) {
    throw new Error(result.message);
  }
  return result;
};

export const createCategory = async (userId: string, categoryName: string) => {
  const body = {
    name: categoryName,
  };

  const response = await fetch(`${base}/${userId}/category`, {
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

  const response = await fetch(`${base}/sign-up`, {
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

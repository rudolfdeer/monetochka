import { Category } from '../constants/interfaces';

const base = 'http://127.0.0.1:3000/api/user';


  //  const ws = new WebSocket('ws://127.0.0.1:3000');

  // ws.onopen = () => {
  //   // connection opened
  //   ws.send('opened'); // send a message
  // };

  // ws.onmessage = function (event) {
  //   const result = JSON.parse(event.data);
  //   try {
  //     if ((result.event = 'data')) {
  //       console.log(result.data);
  //       //changeCategories(result.data.categories);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // ws.onerror = (e) => {
  //   // an error occurred
  //   if (e instanceof Error) {
  //     console.log('error', e.message);
  //   }
  // };

  // ws.onclose = (e) => {
  //   // connection closed
  //   console.log('closed', e.code, e.reason);
  // };

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

export const changeCategory = async (userId: string, category: Category) => {
  const body = { ...category };

  const response = await fetch(`${base}/${userId}/category/${category.id}`, {
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

export const deleteCategory = async (userId: string, categoryId: string) => {
  const response = await fetch(`${base}/${userId}/category/${categoryId}`, {
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
  const response = await fetch(`${base}/${userId}/share`, {
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


  return result.success;
};

export const signOut = () => {
  
};

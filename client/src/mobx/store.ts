import { observable, action, computed, makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';
import { Category, User } from '../constants/interfaces';

class Store {
  @observable categories: Category[] = [];
  @observable userId: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  @action setLoggedInUser = (user: User) => {
    this.userId = user._id;
    this.categories = user.categories;
  }

  @action changeCategories = (categories: Category[]) => {
    this.categories = categories;
  }

  @computed get allCategories () {
    return this.categories;
  }

  @computed get currentUserId () {
    return this.userId;
  }
}

const store = new Store();

export const GlobalStoreContext = createContext(store);

export const useStore = () => {
  return useContext<typeof store>(GlobalStoreContext);
};

export default store;

import { observable, action, computed, makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';
import * as Localization from 'expo-localization';
import { Category, SharedExpense, User } from '../constants/interfaces';

const locale = Localization.locale;

class Store {
  @observable categories: Category[] = [];
  @observable userId: string = '';
  @observable lang: string = locale;
  @observable currency: string = 'USD';
  @observable shared: SharedExpense[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action setLoggedInUser = (user: User) => {
    this.userId = user._id;
    this.categories = user.categories;
    this.currency = user.currency || 'USD';
    this.shared = user.shared;
  }

  @action changeCategories = (categories: Category[]) => {
    this.categories = categories;
  }

  @action changeLang = (lang: string) => {
    this.lang = lang;
  }

  @action changeCurrency = (currency: string) => {
    this.currency = currency;
  }

  @action changeSharedExpenses = (sharedExpenses: SharedExpense[]) => {
    this.shared = sharedExpenses;
  }


  @computed get allCategories () {
    return this.categories;
  }

  @computed get currentUserId () {
    return this.userId;
  }

  @computed get currentLang () {
    return this.lang;
  }

  @computed get currentCurrency () {
    return this.currency;
  }

  @computed get sharedExpenses () {
    return this.shared;
  }
}

const store = new Store();

export const GlobalStoreContext = createContext(store);

export const useStore = () => {
  return useContext<typeof store>(GlobalStoreContext);
};

export default store;

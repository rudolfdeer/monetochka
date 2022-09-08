import { COLORS } from '../styles/colors'
import { ICategory, IUser } from './interfaces'

export const emptyCategory: ICategory = {
  id: '0',
  name: '',
  expenses: 0,
  icon: '',
  color: COLORS.BLACK,
}

export const emptyUser: IUser = {
  _id: '',
  email: '',
  password: '',
  categories: []
}
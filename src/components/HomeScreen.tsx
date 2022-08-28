import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { StackParamList } from '../../App';
import { COLORS } from '../constants/colors';
import { Category, emptyCategory } from '../constants/defaultCategories';
import { MESSAGES } from '../constants/messages';
import Categories from './Categories';
import FormComponent from './Form';
import Navbar from './Navbar';
import Total from './Total';

type HomeScreenProps = {
  params: NativeStackScreenProps<StackParamList, 'Home'>;
  categories: Category[];
  setCategories: Function;
};

export default function HomeScreen({
  params,
  categories,
  setCategories,
}: HomeScreenProps) {
  const [currency, setCurrency] = useState('$');

  const calculateTotal = () => {
    const categoriesSum = categories.reduce((accumulator, object) => {
      return Number((accumulator + object.expenses).toFixed(3));
    }, 0);

    const emptyCategorySum = emptyCategory.expenses;
    const sum = categoriesSum + emptyCategorySum;

    return sum;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Navbar title={'Home'} message={MESSAGES.HOME} />
        <Total value={calculateTotal()} currency={currency} />
        <FormComponent categories={categories} setCategories={setCategories} />
        <Categories categories={categories} currency={currency} />
        <Pressable
          style={styles.button}
          onPress={() => params.navigation.navigate('Categories')}
        >
          <Text style={styles.buttonText}>Manage categories</Text>
        </Pressable>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 13,
    backgroundColor: COLORS.BUTTON,
    marginHorizontal: 16,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
});

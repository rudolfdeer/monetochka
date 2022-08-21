import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Categories from './src/components/Categories';
import FormComponent from './src/components/Form';
import Navbar from './src/components/Navbar';
import Total from './src/components/Total';
import { COLORS } from './src/constants/colors';
import { defaultCategories, emptyCategory } from './src/constants/defaultCategories';

export default function App() {
  const [categories, setCategories] = useState(defaultCategories);
  const [currency, setCurrency] = useState('$');

  const calculateTotal = () => {
    const categoriesSum = categories.reduce((accumulator, object) => {
      return accumulator + object.expenses;
    }, 0);

    const emptyCategorySum = emptyCategory.expenses;
    const sum = categoriesSum + emptyCategorySum;

    return sum;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <Navbar />
      <Total value={calculateTotal()} currency={currency} />
      <FormComponent categories={categories} setCategories={setCategories}/>
      <Categories categories={categories} currency={currency} />
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
});

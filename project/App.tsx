import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Categories from './src/components/Categories';
import FormComponent from './src/components/Form';
import Navbar from './src/components/Navbar';
import Total from './src/components/Total';
import { defaultCategories } from './src/constants/defaultCategories';

export default function App() {
  const [categories, setCategories] = useState(defaultCategories);
  const [currency, setCurrency] = useState('$');

  const calculateTotal = () => {
    const sum = categories.reduce((accumulator, object) => {
      return accumulator + object.expenses;
    }, 0);

    return sum;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <Total value={calculateTotal()} currency={currency} />
      <FormComponent categories={categories} addExpenses={setCategories}/>
      <Categories categories={categories} currency={currency} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

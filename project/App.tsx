import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Categories from './src/components/Categories';
import FormComponent from './src/components/Form';
import Navbar from './src/components/Navbar';
import Total from './src/components/Total';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <Total value={100} currency={'$'} />
      <FormComponent />
      <Categories categories={['first 95$', 'second 5$']} />
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

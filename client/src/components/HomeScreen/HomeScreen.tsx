import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { observer } from 'mobx-react';
import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { StackParamList } from '../../../App';
import { LOCALES } from '../../constants/locales';
import { useStore } from '../../mobx/store';
import { STYLES } from '../../styles/styles';
import Categories from './Categories';
import FormComponent from './Form';
import Navbar from '../shared/Navbar';
import Total from './Total';

type HomeScreenProps = NativeStackScreenProps<StackParamList, 'Home'>;

function HomeScreen(props: HomeScreenProps) {
  const { allCategories } = useStore();
  
  const [currency, setCurrency] = useState('$');
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Navbar title={'Home'} message={LOCALES.HOME} />
        <Total categories={allCategories} currency={currency} />
        <FormComponent />
        <Categories categories={allCategories} currency={currency} />
        <Pressable
          style={styles.button}
          onPress={() => props.navigation.navigate('Categories')}
        >
          <Text style={styles.buttonText}>{LOCALES.MANAGE_CATEGORIES}</Text>
        </Pressable>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...STYLES.PAGE_CONTAINER,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    ...STYLES.BUTTON_BIG,
    marginHorizontal: 16,
  },
  buttonText: {
    ...STYLES.BUTTON_BIG_TEXT,
  },
});

export default observer(HomeScreen);

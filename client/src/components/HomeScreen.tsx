import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { StackParamList } from '../../App';
import { User } from '../constants/interfaces';
import { LOCALES } from '../constants/locales';
import { getUser } from '../helpers/api';
import { STYLES } from '../styles/styles';
import Categories from './Categories';
import FormComponent from './Form';
import Navbar from './Navbar';
import Total from './Total';

type HomeScreenProps = {
  params: NativeStackScreenProps<StackParamList, 'Home'>;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

export default function HomeScreen({ params, user, setUser }: HomeScreenProps) {
  const [currency, setCurrency] = useState('$');
  const [categories, setCategories] = useState(user.categories);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUser(user._id);
      setCategories(response.categories);
    };
    fetchData();
  }, [categories]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Navbar title={'Home'} message={LOCALES.HOME} />
        <Total categories={categories} currency={currency} />
        <FormComponent user={user} setUser={setUser} />
        <Categories categories={categories} currency={currency} />
        <Pressable
          style={styles.button}
          onPress={() => params.navigation.navigate('Categories')}
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

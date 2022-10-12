import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { observer } from 'mobx-react';
import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { StackParamList } from '../../../App';
import { useStore } from '../../mobx/store';
import { STYLES } from '../../styles/styles';
import Categories from './Categories';
import FormComponent from './Form';
import Navbar from '../shared/Navbar';
import Total from './Total';
import FormattedMessageComponent from '../shared/FormattedMessage';
import ModalShareExpenses from './ModalShareExpenses';

type HomeScreenProps = NativeStackScreenProps<StackParamList, 'Home'>;

function HomeScreen(props: HomeScreenProps) {
  const { allCategories, currentCurrency } = useStore();
  const [modalShareExpensesVisible, setModalShareExpensesVisible] =
    useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ModalShareExpenses
          modalShareExpensesVisible={modalShareExpensesVisible}
          setModalShareExpensesVisible={setModalShareExpensesVisible}
        />
        <Navbar params={props} titleId="HOME" messageId="HOME_MSG" />
        <Total categories={allCategories} currency={currentCurrency} />
        <Categories categories={allCategories} currency={currentCurrency} />
        <FormComponent
          modalShareExpensesVisible={modalShareExpensesVisible}
          setModalShareExpensesVisible={setModalShareExpensesVisible}
        />
        <Pressable
          style={styles.button}
          onPress={() => props.navigation.navigate('Categories')}
        >
          <FormattedMessageComponent
            id="MANAGE_CATEGORIES"
            style={styles.buttonText}
          />
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

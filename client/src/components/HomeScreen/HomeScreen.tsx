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
import { useStore } from '../../mobx/store';
import { STYLES } from '../../styles/styles';
import Categories from './Categories';
import FormComponent from './Form';
import Navbar from '../shared/Navbar';
import Total from './Total';
import { FormattedMessage } from 'react-intl';
import { LOCALES_EN } from '../../constants/locales/en';
import ModalShareExpenses from './ModalShareExpenses';

type HomeScreenProps = NativeStackScreenProps<StackParamList, 'Home'>;

function HomeScreen(props: HomeScreenProps) {
  const { allCategories } = useStore();

  const [currency, setCurrency] = useState('$');
  const [modalShareExpensesVisible, setModalShareExpensesVisible] =
    useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ModalShareExpenses
          modalShareExpensesVisible={modalShareExpensesVisible}
          setModalShareExpensesVisible={setModalShareExpensesVisible}
        />
        <Navbar titleId="HOME" messageId="HOME_MSG" />
        <Total categories={allCategories} currency={currency} />
        <FormComponent
          modalShareExpensesVisible={modalShareExpensesVisible}
          setModalShareExpensesVisible={setModalShareExpensesVisible}
        />
        <Categories categories={allCategories} currency={currency} />
        <Pressable
          style={styles.button}
          onPress={() => props.navigation.navigate('Categories')}
        >
          <FormattedMessage
            id="MANAGE_CATEGORIES"
            defaultMessage={LOCALES_EN.MANAGE_CATEGORIES}
          >
            {(msg) => <Text style={styles.buttonText}>{msg}</Text>}
          </FormattedMessage>
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

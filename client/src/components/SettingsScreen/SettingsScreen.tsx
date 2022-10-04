import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react';
import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { StackParamList } from '../../../App';
import { CURRENCIES } from '../../constants/currencies';
import { updateCurrency } from '../../helpers/api';
import { useStore } from '../../mobx/store';
import { STYLES } from '../../styles/styles';
import FormattedMessageComponent from '../shared/FormattedMessage';
import Navbar from '../shared/Navbar';

type SettingsScreenProps = NativeStackScreenProps<StackParamList, 'Settings'>;

function SettingsScreen(props: SettingsScreenProps) {
  const { currentCurrency, currentUserId, changeCurrency } = useStore();
  const [currency, setCurrency] = useState(currentCurrency);

  const handleCurrencyChange = async () => {
    try {
      const updatedUser = await updateCurrency(currentUserId, currency);
      changeCurrency(updatedUser.currency);
      props.navigation.navigate('Home');
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Navbar params={props} titleId="SETTINGS" messageId="SETTINGS_MSG" />
        <View style={styles.sectionContainer}>
          <View style={styles.section}>
            <FormattedMessageComponent id="CURRENCY" style={styles.title} />
            <View style={styles.rowContainer}>
              <FormattedMessageComponent
                id="SELECTED_CURRENCY"
                style={styles.text}
              />
              <Picker
                style={styles.inputSelect}
                itemStyle={styles.selectElement}
                selectedValue={currency}
                onValueChange={(value) => {
                  setCurrency(value);
                }}
              >
                {CURRENCIES.map((currency) => (
                  <Picker.Item
                    label={currency.value}
                    value={currency.value}
                    key={currency.value}
                  />
                ))}
              </Picker>
              <Pressable
                onPress={handleCurrencyChange}
                style={styles.buttonSave}
              >
                <FormattedMessageComponent
                  id="SAVE"
                  style={styles.buttonSmall}
                />
              </Pressable>
            </View>
            <Pressable onPress={() => {}} style={styles.buttonConvert}>
              <FormattedMessageComponent
                id="CONVERT"
                style={styles.buttonSmall}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...STYLES.PAGE_CONTAINER,
  },
  sectionContainer: {
    ...STYLES.SECTION_CONTAINER,
  },
  section: {
    ...STYLES.SECTION,
    paddingTop: 16,
  },
  title: {
    ...STYLES.SECTION_TITLE,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  inputSelect: {
    height: 50,
    width: '30%',
  },
  selectElement: {
    height: 50,
    fontSize: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 50,
  },
  buttonSmall: {
    ...STYLES.BUTTON_SMALL,
    fontSize: 16,
  },
  buttonConvert: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  buttonSave: {
    height: 50,
    display: 'flex',
    justifyContent: 'center',
  },
});

export default observer(SettingsScreen);

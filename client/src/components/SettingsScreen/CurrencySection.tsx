import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Yup from 'yup';
import { Formik, FormikValues } from 'formik';
import { StackParamList } from '../../../App';
import { CURRENCIES } from '../../constants/currencies';
import { updateCurrency } from '../../helpers/api';
import { useStore } from '../../mobx/store';
import { COLORS } from '../../styles/colors';
import { STYLES } from '../../styles/styles';
import FormattedMessageComponent from '../shared/FormattedMessage';

type CurrencyProps = {
  props: NativeStackScreenProps<StackParamList, 'Settings'>;
};

const ValidationSchema = Yup.object().shape({
  exchangeRate: Yup.string()
    .matches(/^\d{1,10}(\.\d+)?$/, 'enter a valid number')
    .required('required'),
});

function CurrencySection({ props }: CurrencyProps) {
  const { currentCurrency, currentUserId, changeCurrency, changeCategories } = useStore();

  const initialValues = {
    exchangeRate: '1',
    currency: currentCurrency,
  };

  const handleFormSubmit = async (values: FormikValues) => {
    try {
      const updatedUser = await updateCurrency(
        currentUserId,
        values.currency,
        values.exchangeRate
      );
      changeCurrency(updatedUser.currency);
      changeCategories(updatedUser.categories);
      props.navigation.navigate('Home');
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.section}>
        <FormattedMessageComponent id="CURRENCY" style={styles.title} />
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          onSubmit={(values) => {
            handleFormSubmit(values);
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <>
              <View style={styles.rowContainer}>
                <FormattedMessageComponent
                  id="SELECTED_CURRENCY"
                  style={styles.text}
                />
                <Picker
                  style={styles.inputSelect}
                  itemStyle={styles.selectElement}
                  selectedValue={values.currency}
                  onValueChange={handleChange('currency')}
                >
                  {CURRENCIES.map((currency) => (
                    <Picker.Item
                      label={currency.value}
                      value={currency.value}
                      key={currency.id}
                    />
                  ))}
                </Picker>
                <Pressable
                  onPress={handleSubmit as (values: FormikValues) => void}
                  style={styles.buttonSave}
                >
                  <FormattedMessageComponent
                    id="SAVE"
                    style={styles.buttonSmall}
                  />
                </Pressable>
              </View>
              <View style={styles.rowContainer}>
                <FormattedMessageComponent
                  id="CONVERT"
                  style={styles.textButtonConvert}
                />
                <Text>1 {currentCurrency} = </Text>
                <TextInput
                  style={styles.input}
                  value={values.exchangeRate}
                  onChangeText={handleChange('exchangeRate')}
                />
                <Text>{values.currency}</Text>
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 16,
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
  textButtonConvert: {
    fontSize: 14,
    color: COLORS.BLACK,
  },
  buttonSave: {
    height: 50,
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    height: 20,
    width: 40,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BLACK,
    paddingHorizontal: 2,
  },
});

export default observer(CurrencySection);

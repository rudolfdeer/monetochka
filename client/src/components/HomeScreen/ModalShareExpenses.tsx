import { Dispatch, SetStateAction } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as Yup from 'yup';
import { Formik, FormikValues } from 'formik';
import { LOCALES_EN } from '../../constants/locales/en';
import { STYLES } from '../../styles/styles';
import { COLORS } from '../../styles/colors';
import { shareExpense } from '../../helpers/api';
import { useStore } from '../../mobx/store';
import { useSockets } from '../../helpers/useSockets';


type ModalShareExpensesProps = {
  modalShareExpensesVisible: boolean;
  setModalShareExpensesVisible: Dispatch<SetStateAction<boolean>>;
};

const initialValues = {
  email: '',
  sum: '0',
};

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  sum: Yup.string()
    .matches(/^\d{1,15}(\.\d+)?$/, 'Enter a valid number')
    .required('Required'),
});

export default function ModalShareExpenses({
  modalShareExpensesVisible,
  setModalShareExpensesVisible,
}: ModalShareExpensesProps) {
  const { currentUserId, currentCurrency } = useStore();
  const { actions } = useSockets();

  const handleFormSubmit = async (values: FormikValues) => {
    const numberSum = +parseFloat(values.sum).toFixed(3);
    const payload = {
      userId: currentUserId,
      email: values.email,
      sum: numberSum, 
      currency: currentCurrency
    };

    try {
      await shareExpense(currentUserId, values.email, numberSum, currentCurrency);
      actions.update(payload);
      alert(`Successfully shared ${numberSum} ${currentCurrency} with ${values.email}`);
      setModalShareExpensesVisible(!modalShareExpensesVisible);

    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalShareExpensesVisible}
      onRequestClose={() => {
        setModalShareExpensesVisible(!modalShareExpensesVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Formik
              initialValues={initialValues}
              validationSchema={ValidationSchema}
              onSubmit={(values) => {
                handleFormSubmit(values);
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.form}>
                  <View style={styles.inputs}>
                    <View style={styles.emailcontainer}>
                      <View style={styles.label}>
                        <FormattedMessage
                          id="EMAIL"
                          defaultMessage={LOCALES_EN.EMAIL}
                        >
                          {(msg) => <Text style={styles.labelText}>{msg}</Text>}
                        </FormattedMessage>
                      </View>
                      <TextInput
                        style={styles.inputText}
                        value={values.email}
                        textAlign={'left'}
                        autoCapitalize={'none'}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                      />
                      <View style={styles.label}>
                        {errors.email && touched.email ? (
                          <Text style={styles.errorText}>{errors.email}</Text>
                        ) : null}
                      </View>
                    </View>
                    <View style={styles.sumContainer}>
                      <View style={styles.label}>
                        <FormattedMessage
                          id="AMOUNT"
                          defaultMessage={LOCALES_EN.AMOUNT}
                        >
                          {(msg) => <Text style={styles.labelText}>{msg}</Text>}
                        </FormattedMessage>
                      </View>
                      <TextInput
                        style={styles.inputText}
                        value={values.sum}
                        textAlign={'left'}
                        autoCapitalize={'none'}
                        onChangeText={handleChange('sum')}
                        onBlur={handleBlur('sum')}
                      />
                      <View style={styles.label}>
                        {errors.sum && touched.sum ? (
                          <Text style={styles.errorText}>{errors.sum}</Text>
                        ) : null}
                      </View>
                    </View>
                  </View>
                  <Pressable
                    style={styles.buttonFirst}
                    onPress={handleSubmit as (values: FormikValues) => void}
                  >
                    <FormattedMessage
                      id="SHARE"
                      defaultMessage={LOCALES_EN.SHARE}
                    >
                      {(msg) => <Text style={styles.buttonText}>{msg}</Text>}
                    </FormattedMessage>
                  </Pressable>
                  <Pressable
                    style={styles.button}
                    onPress={() =>
                      setModalShareExpensesVisible(!modalShareExpensesVisible)
                    }
                  >
                    <FormattedMessage
                      id="CANCEL"
                      defaultMessage={LOCALES_EN.CANCEL}
                    >
                      {(msg) => <Text style={styles.buttonText}>{msg}</Text>}
                    </FormattedMessage>
                  </Pressable>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonBig: {
    ...STYLES.BUTTON_BIG,
    marginBottom: 16,
    width: '60%',
  },
  buttonText: {
    ...STYLES.BUTTON_BIG_TEXT,
  },
  centeredView: {
    ...STYLES.MODAL_CENTERED,
  },
  modalContainer: {
    ...STYLES.MODAL_CONTAINER,
  },
  modalView: {
    ...STYLES.MODAL_VIEW,
  },
  buttonFirst: {
    ...STYLES.BUTTON_BIG,
    marginHorizontal: 0,
    marginBottom: 8,
  },
  inputText: {
    ...STYLES.TEXT_INPUT,
    marginBottom: 4,
  },
  button: {
    ...STYLES.BUTTON_BIG,
  },
  errorContainer: {
    ...STYLES.ERROR_CONTAINER,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  errorText: {
    ...STYLES.ERROR_TEXT,
  },
  successText: {
    ...STYLES.ERROR_TEXT,
    color: COLORS.SUCCESS,
  },
  label: {
    height: 21,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  labelText: {
    ...STYLES.BUTTON_BIG_TEXT,
    color: COLORS.BLACK,
  },
  form: {
    flexDirection: 'column',
  },
  emailcontainer: {
    width: '60%',
    flexDirection: 'column',
    marginRight: 8,
  },
  sumContainer: {
    width: '30%',
    flexDirection: 'column',
  },
  inputs: {
    width: '100%',
    flexDirection: 'row',
  },
});

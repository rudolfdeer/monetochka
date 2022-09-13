import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik, FormikValues } from 'formik';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as Yup from 'yup';
import { StackParamList } from '../../../App';
import { LOCALES } from '../../constants/locales';
import { signIn } from '../../helpers/api';
import { COLORS } from '../../styles/colors';
import { STYLES } from '../../styles/styles';
import { observer } from 'mobx-react';
import { useStore } from '../../mobx/store';

type ModalLogInProps = {
  params: NativeStackScreenProps<StackParamList, 'Intro'>;
  modalLogInVisible: boolean;
  setModalLogInVisible: Dispatch<SetStateAction<boolean>>;
};

const initialValues = {
  email: '',
  password: '',
};

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

function ModalLogIn({
  params,
  modalLogInVisible,
  setModalLogInVisible,
}: ModalLogInProps) {
  const { setLoggedInUser } = useStore();
  
  const [error, setError] = useState('');

  const handleFormSubmit = async (values: FormikValues) => {
    try {
      const user = await signIn(values.email, values.password);
      setModalLogInVisible(!modalLogInVisible);
      setLoggedInUser(user);
      params.navigation.navigate('Home');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalLogInVisible}
      onRequestClose={() => {
        setModalLogInVisible(!modalLogInVisible);
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
                  <View style={styles.label}>
                    <Text style={styles.labelText}>{LOCALES.EMAIL}</Text>
                  </View>
                  <TextInput
                    style={styles.inputText}
                    textAlign={'left'}
                    autoCapitalize={'none'}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                  <View style={styles.label}>
                    {errors.email && touched.email ? (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    ) : null}
                  </View>
                  <View style={styles.label}>
                    <Text style={styles.labelText}>{LOCALES.PASSWORD}</Text>
                  </View>
                  <TextInput
                    style={styles.inputText}
                    textAlign={'left'}
                    autoCapitalize={'none'}
                    secureTextEntry={true}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                  />
                  <View style={styles.label}>
                    {errors.password && touched.password ? (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    ) : null}
                  </View>
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                  <Pressable
                    style={styles.button}
                    onPress={() => {
                      handleSubmit();
                    }}
                  >
                    <Text style={styles.buttonText}>{LOCALES.LOG_IN}</Text>
                  </Pressable>
                </View>
              )}
            </Formik>
            <Pressable
              style={styles.buttonLast}
              onPress={() => setModalLogInVisible(!modalLogInVisible)}
            >
              <Text style={styles.buttonText}>{LOCALES.CANCEL}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
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
  buttonLast: {
    ...STYLES.BUTTON_BIG,
    marginHorizontal: 0,
    marginBottom: 0,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  inputText: {
    ...STYLES.TEXT_INPUT,
    marginBottom: 4,
  },
  label: {
    height: 21,
    marginBottom: 8,
  },
  labelText: {
    ...STYLES.BUTTON_BIG_TEXT,
    color: COLORS.BLACK,
  },
  errorContainer: {
    ...STYLES.ERROR_CONTAINER,
  },
  errorText: {
    ...STYLES.ERROR_TEXT,
  },
});

export default observer(ModalLogIn);

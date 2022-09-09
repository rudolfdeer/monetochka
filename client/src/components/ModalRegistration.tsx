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
import { StackParamList } from '../../App';
import { IUser } from '../constants/interfaces';
import { LOCALES } from '../constants/locales';
import { signUp } from '../helpers/api';
import { COLORS } from '../styles/colors';
import { STYLES } from '../styles/styles';

type ModalRegistrationProps = {
  params: NativeStackScreenProps<StackParamList, 'Intro'>;
  modalRegistrationVisible: boolean;
  setModalRegistrationVisible: Dispatch<SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
};

const initialValues = {
  email: '',
  password: '',
  confirmedPassword: '',
};

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  confirmedPassword: Yup.string().test(
    'passwords-match',
    'Passwords must match',
    function (value) {
      return this.parent.password === value;
    }
  ).required('Required'),
});

export default function ModalRegistration({
  params,
  modalRegistrationVisible,
  setModalRegistrationVisible,
  setUser,
}: ModalRegistrationProps) {
  const [error, setError] = useState('');

  const handleFormSubmit = async (values: FormikValues) => {
    try {
      const user = await signUp(values.email, values.password);
      setUser(user);
      setModalRegistrationVisible(!modalRegistrationVisible);
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
      visible={modalRegistrationVisible}
      onRequestClose={() => {
        setModalRegistrationVisible(!modalRegistrationVisible);
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
                    textAlign={'left'}
                    autoCapitalize={'none'}
                    style={styles.inputText}
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
                    <Text style={styles.labelText}>{LOCALES.CREATE_PASSWORD}</Text>
                  </View>
                  <TextInput
                    textAlign={'left'}
                    autoCapitalize={'none'}
                    secureTextEntry={true}
                    style={styles.inputText}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                  />
                  <View style={styles.label}>
                    {errors.password && touched.password ? (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    ) : null}
                  </View>
                  <View style={styles.label}>
                    <Text style={styles.labelText}>
                      {LOCALES.CONFIRM_PASSWORD}
                    </Text>
                  </View>
                  <TextInput
                    secureTextEntry={true}
                    style={styles.inputText}
                    value={values.confirmedPassword}
                    onChangeText={handleChange('confirmedPassword')}
                    onBlur={handleBlur('confirmedPassword')}
                  />
                  <View style={styles.label}>
                    {errors.confirmedPassword && touched.confirmedPassword ? (
                      <Text style={styles.errorText}>
                        {errors.confirmedPassword}
                      </Text>
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
                    <Text style={styles.buttonText}>{LOCALES.CREATE_ACCOUNT}</Text>
                  </Pressable>
                </View>
              )}
            </Formik>
            <Pressable
              style={styles.buttonLast}
              onPress={() =>
                setModalRegistrationVisible(!modalRegistrationVisible)
              }
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

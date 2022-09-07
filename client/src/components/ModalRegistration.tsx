import { Formik, FormikValues } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { STYLES } from '../styles/styles';

type ModalRegistrationProps = {
  modalRegistrationVisible: boolean;
  setModalRegistrationVisible: Dispatch<SetStateAction<boolean>>;
};

const initialValues = {
  email: '',
  password: '',
  confirmedPassword: '',
};

export default function ModalRegistration({
  modalRegistrationVisible,
  setModalRegistrationVisible,
}: ModalRegistrationProps) {
  const handleFormSubmit = (values: FormikValues) => {
    console.log(values);
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
              onSubmit={(values) => {
                handleFormSubmit(values);
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.form}>
                  <TextInput
                    style={styles.inputText}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                  <TextInput
                    secureTextEntry={true}
                    style={styles.inputText}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                  />
                  <TextInput
                    secureTextEntry={true}
                    style={styles.inputText}
                    value={values.confirmedPassword}
                    onChangeText={handleChange('confirmedPassword')}
                    onBlur={handleBlur('confirmedPassword')}
                  />
                  <Pressable
                    style={styles.button}
                    onPress={() => {
                      handleSubmit();
                      setModalRegistrationVisible(!modalRegistrationVisible);
                    }}
                  >
                    <Text style={styles.buttonText}>Create account</Text>
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
              <Text style={styles.buttonText}>Cancel</Text>
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
    textAlign: 'none',
  },
});

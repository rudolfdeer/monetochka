import { Formik, FormikValues } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS } from '../styles/colors';
import { STYLES } from '../styles/styles';

type ModalLogInProps = {
  modalLogInVisible: boolean;
  setModalLogInVisible: Dispatch<SetStateAction<boolean>>;
}

const initialValues = {
  email: '',
  password: '',
};

export default function ModalLogIn({modalLogInVisible, setModalLogInVisible}: ModalLogInProps) {
  const handleFormSubmit = (values: FormikValues) => {
    console.log(values);
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
                    style={styles.inputText}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                  />
                  <Pressable
                    style={styles.button}
                    onPress={() => {
                      handleSubmit();
                      setModalLogInVisible(!modalLogInVisible);
                    }}
                  >
                    <Text style={styles.buttonText}>Log in</Text>
                  </Pressable>
                </View>
              )}
            </Formik>
            <Pressable
              style={styles.buttonLast}
              onPress={() => setModalLogInVisible(!modalLogInVisible)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
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

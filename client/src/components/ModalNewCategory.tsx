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
import { STYLES } from '../styles/styles';
import { createCategory } from '../helpers/api';
import { LOCALES } from '../constants/locales';
import { useStore } from '../mobx/store';
import { observer } from 'mobx-react';

type ModalNewCategoryProps = {
  modalAddVisible: boolean;
  setModalAddVisible: Dispatch<SetStateAction<boolean>>;
};

const initialValues = {
  name: 'New category',
};

function ModalNewCategory({
  modalAddVisible,
  setModalAddVisible,
}: ModalNewCategoryProps) {
  const { currentUserId, changeCategories } = useStore();

  const [error, setError] = useState('');
  
  const handleFormSubmit = async (values: FormikValues) => {
    try {
      const user = await createCategory(currentUserId, values.name);
      setModalAddVisible(!modalAddVisible);
      changeCategories(user.categories);
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
      visible={modalAddVisible}
      onRequestClose={() => {
        setModalAddVisible(!modalAddVisible);
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
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                  />
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                  <Pressable
                    style={styles.button}
                    onPress={() => {
                      handleSubmit();
                      setModalAddVisible(!modalAddVisible);
                    }}
                  >
                    <Text style={styles.buttonText}>{LOCALES.ADD}</Text>
                  </Pressable>
                </View>
              )}
            </Formik>
            <Pressable
              style={styles.buttonLast}
              onPress={() => setModalAddVisible(!modalAddVisible)}
            >
              <Text style={styles.buttonText}>{LOCALES.CLOSE}</Text>
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
  errorContainer: {
    ...STYLES.ERROR_CONTAINER,
  },
  errorText: {
    ...STYLES.ERROR_TEXT,
  },
});

export default observer(ModalNewCategory);

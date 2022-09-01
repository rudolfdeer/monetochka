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
import { addNewCategory } from '../api/categoriesApi';
import { COLORS } from '../styles/colors';
import { Category } from '../constants/defaultCategories';
import { STYLES } from '../styles/styles';

type ModalNewCategoryProps = {
  modalAddVisible: boolean;
  setModalAddVisible: Dispatch<SetStateAction<boolean>>;
  setCategories: Function;
  categories: Category[];
};

const initialValues = {
  name: 'New category',
};

export default function ModalNewCategory({
  modalAddVisible,
  setModalAddVisible,
  setCategories,
  categories,
}: ModalNewCategoryProps) {
  const handleFormSubmit = (values: FormikValues) => {
    const response = addNewCategory(values, categories);
    setCategories(response);
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
                  <Pressable
                    style={styles.button}
                    onPress={() => {
                      handleSubmit();
                      setModalAddVisible(!modalAddVisible);
                    }}
                  >
                    <Text style={styles.buttonText}>Add</Text>
                  </Pressable>
                </View>
              )}
            </Formik>
            <Pressable
              style={styles.buttonLast}
              onPress={() => setModalAddVisible(!modalAddVisible)}
            >
              <Text style={styles.buttonText}>Close</Text>
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
    fontSize: 16,
    lineHeight: 21,
    marginBottom: 16,
    width: '100%',
    height: 50,
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: 13,
  },
});

import { Picker } from '@react-native-picker/picker';
import { Formik, FormikValues } from 'formik';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Yup from 'yup';
import { addExpensesToCategory } from '../api/categoriesApi';
import { COLORS } from '../styles/colors';
import { Category, emptyCategory } from '../constants/defaultCategories';
import { STYLES } from '../styles/styles';

type FormProps = {
  categories: Category[];
  setCategories: Function;
};

const initialValues = {
  sum: '0',
  category: '',
};

const ValidationSchema = Yup.object().shape({
  sum: Yup.string()
    .matches(/^\d{1,15}(\.\d+)?$/, 'enter a valid number')
    .required('required'),
});

export default function FormComponent({
  categories,
  setCategories,
}: FormProps) {
  const handleFormSubmit = (values: FormikValues) => {
    console.log(values);
    const response = addExpensesToCategory(values, categories);
    setCategories(response);
  };

  return (
    <View style={styles.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={(values) => {
          handleFormSubmit(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.inputText}
              value={values.sum}
              onChangeText={handleChange('sum')}
              onBlur={handleBlur('sum')}
            />
            <Picker
              style={styles.inputSelect}
              itemStyle={styles.selectElement}
              selectedValue={values.category}
              onValueChange={handleChange('category')}
            >
              <Picker.Item
                label={emptyCategory.name}
                value={emptyCategory.name}
                key={emptyCategory.id}
              />
              {categories.map((category) => {
                return (
                  <Picker.Item
                    label={category.name}
                    value={category.name}
                    key={category.id}
                  />
                );
              })}
            </Picker>
            <Pressable
              style={styles.button}
              onPress={handleSubmit as (values: FormikValues) => void}
            >
              <Text style={styles.buttonText}>Add</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    ...STYLES.SECTION_CONTAINER,
  },
  form: {
    ...STYLES.SECTION,
    flexDirection: 'row',
    height: 110,
    alignItems: 'center',
    paddingVertical: 16,
  },
  inputText: {
    height: 50,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: 13,
    padding: 10,
    width: '20%',
  },
  inputSelect: {
    height: 50,
    width: '50%',
  },
  selectElement: {
    height: 50,
    fontSize: 15,
  },
  button: {
    ...STYLES.BUTTON_BIG,
  },
  buttonText: {
    ...STYLES.BUTTON_BIG_TEXT,
  },
});

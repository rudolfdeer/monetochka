import { Picker } from '@react-native-picker/picker';
import { Formik, FormikValues } from 'formik';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Yup from 'yup';
import { Category } from '../constants/defaultCategories';

type FormProps = {
  categories: Category[];
  addExpenses: Function;
};

const initialValues = {
  sum: '0',
  category: '',
};

const ValidationSchema = Yup.object().shape({
  sum: Yup.string()
    .matches(/^[0-9]{1,10}$/, 'enter a valid number')
    .required('required'),
});

export default function FormComponent({ categories, addExpenses }: FormProps) {
  const handleFormSubmit = (values: FormikValues) => {
    const category =
      categories.find((el) => el.name === values.category) || categories[0];
    category.expenses = category.expenses + Number(values.sum);

    const newCategories = categories.map((el) => {
      if (el.id === category.id) {
        el = category;
      }
      return el;
    });

    addExpenses(newCategories);
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
    paddingHorizontal: 16,
    width: '100%',
  },
  form: {
    flexDirection: 'row',
    marginBottom: 20,
    height: 110,
    backgroundColor: '#F2F2F7',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  inputText: {
    height: 50,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
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
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 13,
    backgroundColor: 'blue',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    color: 'white',
  },
});

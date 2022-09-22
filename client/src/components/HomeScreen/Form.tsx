import { Picker } from '@react-native-picker/picker';
import { Formik, FormikValues } from 'formik';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Yup from 'yup';
import { COLORS } from '../../styles/colors';
import { STYLES } from '../../styles/styles';
import { Dispatch, SetStateAction, useState } from 'react';
import { changeCategory } from '../../helpers/api';
import { useStore } from '../../mobx/store';
import { observer } from 'mobx-react';
import FormattedMessageComponent from '../shared/FormattedMessage';

type FormProps = {
  modalShareExpensesVisible: boolean;
  setModalShareExpensesVisible: Dispatch<SetStateAction<boolean>>;
};

const initialValues = {
  sum: '0',
  categoryId: '',
};

const ValidationSchema = Yup.object().shape({
  sum: Yup.string()
    .matches(/^\d{1,15}(\.\d+)?$/, 'enter a valid number')
    .required('required'),
});

function FormComponent({
  setModalShareExpensesVisible,
}: FormProps) {
  const [error, setError] = useState('');

  const { allCategories, changeCategories, currentUserId } = useStore();

  const handleFormSubmit = async (values: FormikValues) => {
    const category = allCategories.find((cat) => cat.id === values.categoryId);
    if (!category) {
      return;
    }
    category.expenses = Number(
      (category.expenses + parseFloat(values.sum)).toFixed(3)
    );

    try {
      const updatedUser = await changeCategory(currentUserId, category);
      changeCategories(updatedUser.categories);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
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
            <View style={styles.row}>
              <TextInput
                style={styles.inputText}
                value={values.sum}
                onChangeText={handleChange('sum')}
                onBlur={handleBlur('sum')}
              />
              <Picker
                style={styles.inputSelect}
                itemStyle={styles.selectElement}
                selectedValue={values.categoryId}
                onValueChange={handleChange('categoryId')}
              >
                {allCategories.map((category) => {
                  return (
                    <Picker.Item
                      label={category.name}
                      value={category.id}
                      key={category.id}
                    />
                  );
                })}
              </Picker>
              <Pressable
                style={styles.button}
                onPress={handleSubmit as (values: FormikValues) => void}
              >
                <FormattedMessageComponent id="ADD" style={styles.buttonText} />
              </Pressable>
            </View>
            <View style={styles.buttonShareContainer}>
              <Pressable
                style={styles.buttonShare}
                onPress={() => {
                  setModalShareExpensesVisible(true);
                }}
              >
                <FormattedMessageComponent id="SHARE_EXPENSES" style={styles.buttonText} />
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    ...STYLES.SECTION_CONTAINER,
  },
  form: {
    ...STYLES.SECTION,
    marginBottom: 0,
  },
  row: {
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 13,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    width: '100%',
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
  errorContainer: {
    ...STYLES.ERROR_CONTAINER,
  },
  errorText: {
    ...STYLES.ERROR_TEXT,
  },
  buttonShare: {
    ...STYLES.BUTTON_BIG,
    width: '100%',
  },
  buttonShareContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default observer(FormComponent);

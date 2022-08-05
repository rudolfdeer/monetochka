import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function FormComponent() {
  const [category, setCategory] = useState();
  return (
    <View style={styles.formContainer}>
      <View style={styles.form}>
        <TextInput style={styles.inputText} />
        <Picker
          style={styles.inputSelect}
          itemStyle={styles.selectElement}
          selectedValue={category}
          onValueChange={(value) => setCategory(value)}
        >
          <Picker.Item label="home" value="category1" />
          <Picker.Item label="otherother" value="category2" />
        </Picker>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>
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

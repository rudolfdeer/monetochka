import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StackParamList } from '../../App';
import { COLORS } from '../constants/colors';
import { Category, defaultCategories } from '../constants/defaultCategories';
import { MESSAGES } from '../constants/messages';
import ModalNewCategory from './ModalNewCategory';
import Navbar from './Navbar';

type CategoriesScreenProps = {
  params: NativeStackScreenProps<StackParamList, 'Categories'>;
  categories: Category[];
  setCategories: Function;
};

export default function CategoriesScreen({
  categories,
  setCategories,
}: CategoriesScreenProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Navbar title={'Categories'} message={MESSAGES.CATEGORIES} />
        <View style={styles.categoriesContainer}>
          <ModalNewCategory
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setCategories={setCategories}
            categories={categories}
          />
          <View style={styles.categories}>
            {categories.map((category) => (
              <View style={styles.rowContainer} key={category.id}>
                <View style={styles.categoryContainer}>
                  <View style={styles.icon}></View>
                  <Text style={styles.category}>{category.name}</Text>
                </View>
                <Pressable onPress={() => {}}>
                  <Text style={styles.buttonEdit}>Edit</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Add new category</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    width: '100%',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  categories: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 13,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  category: {
    height: 24,
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 18,
  },
  'category:last-child': {
    marginBottom: 0,
  },
  icon: {
    width: 24,
    height: 24,
    backgroundColor: COLORS.ICON,
    marginRight: 8,
  },
  buttonEdit: {
    fontSize: 12,
    lineHeight: 20,
    color: COLORS.BUTTON,
  },
  button: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 13,
    backgroundColor: COLORS.BUTTON,
    marginHorizontal: 16,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
});

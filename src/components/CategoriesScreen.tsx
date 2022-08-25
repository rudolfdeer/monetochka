import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StackParamList } from '../../App';
import { COLORS } from '../constants/colors';
import { Category, emptyCategory } from '../constants/defaultCategories';
import { MESSAGES } from '../constants/messages';
import ModalEditCategory from './ModalEditCategory';
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
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [category, setCategory] = useState<Category>(emptyCategory);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Navbar title={'Categories'} message={MESSAGES.CATEGORIES} />
        <View style={styles.categoriesContainer}>
          <ModalNewCategory
            modalAddVisible={modalAddVisible}
            setModalAddVisible={setModalAddVisible}
            setCategories={setCategories}
            categories={categories}
          />
          <ModalEditCategory
            modalEditVisible={modalEditVisible}
            setModalEditVisible={setModalEditVisible}
            setCategories={setCategories}
            categories={categories}
            currentCategory={category}
          />
          <View style={styles.categories}>
            {categories.map((category) => (
              <View style={styles.rowContainer} key={category.id}>
                <View style={styles.categoryContainer}>
                  {category.icon ? (
                    <View style={styles.iconEmoji}>
                      <Text>{category.icon}</Text>
                    </View>
                  ) : (
                    <View style={styles.icon}></View>
                  )}
                  <Text style={styles.category}>{category.name}</Text>
                </View>
                <Pressable
                  onPress={() => {
                    setCategory(category);
                    setModalEditVisible(true);
                  }}
                >
                  <Text style={styles.buttonEdit}>Edit</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => setModalAddVisible(true)}
        >
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
  iconEmoji: {
    width: 24,
    height: 24,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
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

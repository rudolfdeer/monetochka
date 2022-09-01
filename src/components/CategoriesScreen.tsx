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
import { COLORS } from '../styles/colors';
import { Category, emptyCategory } from '../constants/defaultCategories';
import { MESSAGES } from '../constants/messages';
import { STYLES } from '../styles/styles';
import ModalEditCategory from './ModalEditCategory';
import ModalNewCategory from './ModalNewCategory';
import Navbar from './Navbar';

type CategoriesScreenProps = {
  params: NativeStackScreenProps<StackParamList, 'Categories'>;
  categories: Category[];
  setCategories: Function;
};

const getColorStyle = (color: string) => {
  return {
    color: color,
  };
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
                  <Text
                    style={[styles.category, getColorStyle(category.color)]}
                  >
                    {category.name}
                  </Text>
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
    ...STYLES.PAGE_CONTAINER,
  },
  categoriesContainer: {
    ...STYLES.SECTION_CONTAINER,
  },
  categories: {
    ...STYLES.SECTION,
    paddingTop: 16,
  },
  rowContainer: {
    ...STYLES.SECTION_ELEMENT_ROW_CONTINER,
    justifyContent: 'space-between',
  },
  categoryContainer: {
    ...STYLES.SECTION_ELEMENT_ROW_CONTINER,
  },
  category: {
    ...STYLES.SECTION_ELEMENT,
  },
  'category:last-child': {
    marginBottom: 0,
  },
  icon: {
    ...STYLES.ICON,
  },
  iconEmoji: {
    ...STYLES.ICON_EMOJI,
  },
  buttonEdit: {
    ...STYLES.BUTTON_SMALL,
    lineHeight: 20,
  },
  button: {
    ...STYLES.BUTTON_BIG,
    marginHorizontal: 16,
  },
  buttonText: {
    ...STYLES.BUTTON_BIG_TEXT,
  },
});

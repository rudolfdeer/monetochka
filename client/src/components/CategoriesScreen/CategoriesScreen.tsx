import { observer } from 'mobx-react';
import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { emptyCategory } from '../../constants/emptyMocks';
import { Category } from '../../constants/interfaces';
import { LOCALES } from '../../constants/locales';
import { deleteCategory } from '../../helpers/api';
import { useStore } from '../../mobx/store';
import { STYLES } from '../../styles/styles';
import ModalEditCategory from './ModalEditCategory';
import ModalNewCategory from './ModalNewCategory';
import Navbar from '../shared/Navbar';
import BarChart from './BarChart';
import { FormattedMessage } from 'react-intl';
import { LOCALES_EN } from '../../constants/locales/en';

const getChartData = (categories: Category[]) => {
  const data = categories.map((category) => ({
    label: category.icon,
    value: category.expenses,
    color: category.color,
  }));
  return data;
};

function CategoriesScreen() {
  const { allCategories, currentUserId, changeCategories } = useStore();

  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(emptyCategory);
  const [error, setError] = useState('');

  const handleDeleteCategory = async (category: Category) => {
    try {
      const user = await deleteCategory(currentUserId, category.id);
      changeCategories(user.categories);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Navbar titleId="CATEGORIES" messageId="CATEGORIES_MSG" />
        <View style={styles.categoriesContainer}>
          <ModalNewCategory
            modalAddVisible={modalAddVisible}
            setModalAddVisible={setModalAddVisible}
          />
          <ModalEditCategory
            modalEditVisible={modalEditVisible}
            setModalEditVisible={setModalEditVisible}
            category={selectedCategory}
          />
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
          <View style={styles.categories}>
            {allCategories.map((category) => (
              <View style={styles.rowContainer} key={category.id}>
                <View style={styles.categoryContainer}>
                  {category.icon ? (
                    <View style={styles.iconEmoji}>
                      <Text>{category.icon}</Text>
                    </View>
                  ) : (
                    <View style={styles.icon}></View>
                  )}
                  <Text style={[styles.category, { color: category.color }]}>
                    {category.name}
                  </Text>
                </View>
                <View style={styles.buttonsContainer}>
                  <Pressable
                    style={styles.firstBtn}
                    onPress={() => {
                      setSelectedCategory(category);
                      setModalEditVisible(true);
                    }}
                  >
                    <FormattedMessage
                      id="EDIT"
                      defaultMessage={LOCALES_EN.EDIT}
                    >
                      {(msg) => <Text style={styles.buttonEdit}>{msg}</Text>}
                    </FormattedMessage>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setSelectedCategory(category);
                      handleDeleteCategory(category);
                    }}
                  >
                    <FormattedMessage
                      id="DELETE"
                      defaultMessage={LOCALES_EN.DELETE}
                    >
                      {(msg) => <Text style={styles.buttonEdit}>{msg}</Text>}
                    </FormattedMessage>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.categories}>
            <FormattedMessage
              id="STATISTICS"
              defaultMessage={LOCALES_EN.STATISTICS}
            >
              {(msg) => <Text style={styles.title}>{msg}</Text>}
            </FormattedMessage>
            <View style={styles.chart}>
              <BarChart data={getChartData(allCategories)} />
            </View>
          </View>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => setModalAddVisible(true)}
        >
          <FormattedMessage
            id="ADD_NEW_CATEGORY"
            defaultMessage={LOCALES_EN.ADD_NEW_CATEGORY}
          >
            {(msg) => <Text style={styles.buttonText}>{msg}</Text>}
          </FormattedMessage>
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
  errorContainer: {
    ...STYLES.ERROR_CONTAINER,
  },
  errorText: {
    ...STYLES.ERROR_TEXT,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  firstBtn: {
    marginRight: 16,
  },
  title: {
    ...STYLES.SECTION_TITLE,
  },
  chart: {},
});

export default observer(CategoriesScreen);

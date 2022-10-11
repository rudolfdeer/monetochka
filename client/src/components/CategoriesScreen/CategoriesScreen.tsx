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
import { deleteCategory } from '../../helpers/api';
import { useStore } from '../../mobx/store';
import { STYLES } from '../../styles/styles';
import ModalEditCategory from './ModalEditCategory';
import ModalNewCategory from './ModalNewCategory';
import Navbar from '../shared/Navbar';
import BarChart from './BarChart';
import FormattedMessageComponent from '../shared/FormattedMessage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../../App';

type CategoriesScreenProps = NativeStackScreenProps<StackParamList, 'Categories'>;

const getChartData = (categories: Category[]) => {
  const data = categories.map((category) => ({
    label: category.icon,
    value: category.expenses,
    color: category.color,
  }));
  return data;
};

function CategoriesScreen(props: CategoriesScreenProps) {
  const { allCategories, currentUserId, changeCategories } = useStore();

  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(emptyCategory);

  const handleDeleteCategory = async (category: Category) => {
    try {
      const user = await deleteCategory(currentUserId, category.id);
      changeCategories(user.categories);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Navbar params={props} titleId="CATEGORIES" messageId="CATEGORIES_MSG" />
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
                    <FormattedMessageComponent
                      id="EDIT"
                      style={styles.buttonSmall}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setSelectedCategory(category);
                      handleDeleteCategory(category);
                    }}
                  >
                    <FormattedMessageComponent
                      id="DELETE"
                      style={styles.buttonSmall}
                    />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.categories}>
            <FormattedMessageComponent id="STATISTICS" style={styles.title} />
            <View style={styles.chart}>
              <BarChart data={getChartData(allCategories)} />
            </View>
          </View>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => setModalAddVisible(true)}
        >
          <FormattedMessageComponent
            id="ADD_NEW_CATEGORY"
            style={styles.buttonText}
          />
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
  buttonSmall: {
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

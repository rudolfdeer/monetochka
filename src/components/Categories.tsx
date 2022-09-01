import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../styles/colors';
import { Category, emptyCategory } from '../constants/defaultCategories';
import { STYLES } from '../styles/styles';

type CategoriesProps = {
  categories: Category[];
  currency: string;
};

export default function Categories({ categories, currency }: CategoriesProps) {
  const getColorStyle = (color: string) => {
    return {
      color: color,
    };
  };

  return (
    <View style={styles.categoriesContainer}>
      <View style={styles.categories}>
        <Text style={styles.title}>Expenses</Text>
        <View style={styles.categoryContainer} key={emptyCategory.id}>
          <View style={styles.icon}></View>
          <Text style={styles.category}>
            unsorted: {emptyCategory.expenses}
            {currency}
          </Text>
        </View>
        {categories?.map((category) => (
          <View style={styles.categoryContainer} key={category.id}>
            {category.icon ? (
              <View style={styles.iconEmoji}>
                <Text>{category.icon}</Text>
              </View>
            ) : (
              <View style={styles.icon}></View>
            )}
            <Text style={[styles.category, getColorStyle(category.color)]}>
              {category.name}: {category.expenses}
              {currency}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoriesContainer: {
    ...STYLES.SECTION_CONTAINER,
  },
  categories: {
    ...STYLES.SECTION,
    paddingTop: 16,
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
  title: {
    ...STYLES.SECTION_TITLE,
  },
});

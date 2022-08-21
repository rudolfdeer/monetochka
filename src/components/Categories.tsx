import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/colors';
import { Category, emptyCategory } from '../constants/defaultCategories';

type CategoriesProps = {
  categories: Category[];
  currency: string;
};

export default function Categories({ categories, currency }: CategoriesProps) {
  return (
    <View style={styles.categoriesContainer}>
      <View style={styles.categories}>
        <Text style={styles.title}>Expenses</Text>

        <View style={styles.categoryContainer} key={emptyCategory.id}>
              <View style={styles.icon}></View>
              <Text style={styles.category}>
                unsorted:  {emptyCategory.expenses}
                {currency}
              </Text>
            </View>

        {categories?.map((category) => (
            <View style={styles.categoryContainer} key={category.id}>
              <View style={styles.icon}></View>
              <Text style={styles.category}>
                {category.name}: {category.expenses}
                {currency}
              </Text>
            </View>
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoriesContainer: {
    paddingHorizontal: 16,
    width: '100%',
  },
  categories: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 13,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
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
  title: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
});

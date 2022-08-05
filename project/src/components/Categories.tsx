import { StyleSheet, Text, View } from 'react-native';

type CategoriesProps = {
  categories?: string[];
};

export default function Categories({ categories }: CategoriesProps) {
  return (
    <View style={styles.categoriesContainer}>
      <View style={styles.categories}>
        <Text style={styles.title}>Expenses</Text>
        {categories?.map((category) => {
          return (
            <View style={styles.categoryContainer} key={Math.random()}>
              <View style={styles.icon}></View>
              <Text style={styles.category}>{category}</Text>
            </View>
          );
        })}
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
    backgroundColor: '#F2F2F7',
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
    backgroundColor: '#D1D1D6',
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
});

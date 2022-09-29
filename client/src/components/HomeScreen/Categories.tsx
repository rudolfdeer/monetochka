import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Category } from '../../constants/interfaces';
import { STYLES } from '../../styles/styles';
import FormattedMessageComponent from '../shared/FormattedMessage';

type CategoriesProps = {
  categories: Category[];
  currency: string;
};

const chartConfig = {
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
};

export default function Categories({ categories, currency }: CategoriesProps) {
  return (
    <View style={styles.categoriesContainer}>
      <View style={styles.categories}>
        <FormattedMessageComponent id="EXPENSES" style={styles.title} />
        <View style={styles.rowContainer}>
          <View>
            {categories?.map((category) => (
              <View style={styles.categoryContainer} key={category.id}>
                {category.icon ? (
                  <View style={styles.iconEmoji}>
                    <Text>{category.icon}</Text>
                  </View>
                ) : (
                  <View style={styles.icon}></View>
                )}
                <Text style={[styles.category, { color: category.color }]}>
                  {category.name}: {category.expenses}
                  {currency}
                </Text>
              </View>
            ))}
          </View>
          <PieChart
            data={categories}
            width={150}
            height={150}
            chartConfig={chartConfig}
            accessor={'expenses'}
            backgroundColor={'transparent'}
            paddingLeft={'30'}
            center={[0, 0]}
            hasLegend={false}
            absolute
          />
        </View>
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
    paddingRight: 0,
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
  rowContainer: {
    flexDirection: 'row',
  },
});

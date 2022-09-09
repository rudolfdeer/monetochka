import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { emptyCategory } from '../constants/emptyMocks';
import { ICategory } from '../constants/interfaces';
import { LOCALES } from '../constants/locales';
import { STYLES } from '../styles/styles';

type TotalProps = {
  categories: ICategory[];
  currency: string;
};

export default function Total({ categories, currency }: TotalProps) {
  const [value, setValue] = useState(0);

  const calculateTotal = () => {
    const categoriesSum = categories.reduce((accumulator, object) => {
      return Number((accumulator + object.expenses).toFixed(3));
    }, 0);

    const emptyCategorySum = emptyCategory.expenses;
    const sum = categoriesSum + emptyCategorySum;
    return sum;
  };

  useEffect(() => {
    const value = calculateTotal();
    setValue(value);
  }, [categories])

  return (
    <View style={styles.totalContainer}>
      <View style={styles.total}>
        <Text style={styles.totalText}>{LOCALES.TOTAL_EXPENSES}</Text>
        <Text style={styles.totalSum}>
          {value} {currency}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  totalContainer: STYLES.SECTION_CONTAINER,
  total: {
    ...STYLES.SECTION,
    height: 110,
  },
  totalText: STYLES.PAGE_MESSAGE,
  totalSum: {
    height: 42,
    fontWeight: '700',
    fontSize: 34,
    lineHeight: 41,
  },
});

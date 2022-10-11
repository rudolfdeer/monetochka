import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { emptyCategory } from '../../constants/emptyMocks';
import { Category } from '../../constants/interfaces';
import { STYLES } from '../../styles/styles';
import FormattedMessageComponent from '../shared/FormattedMessage';

type TotalProps = {
  categories: Category[];
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
  }, [categories]);

  return (
    <View style={styles.totalContainer}>
      <View style={styles.total}>
        <FormattedMessageComponent
          id="TOTAL_EXPENSES"
          style={styles.totalText}
        />
        <Text style={styles.totalSum}>
          {value} {currency}
        </Text>
      </View>
      <View></View>
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

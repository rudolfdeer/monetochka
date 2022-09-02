import { StyleSheet, Text, View } from 'react-native';
import { STYLES } from '../styles/styles';

type TotalProps = {
  value: number;
  currency: string;
};

export default function Total({ value, currency }: TotalProps) {
  return (
    <View style={styles.totalContainer}>
      <View style={styles.total}>
        <Text style={styles.totalText}>Total Expenses</Text>
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

const totalStyle = StyleSheet.flatten([STYLES.SECTION, styles.total]);

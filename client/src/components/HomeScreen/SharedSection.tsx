import { StyleSheet, Text, View } from 'react-native';
import { SharedExpense } from '../../constants/interfaces';
import { STYLES } from '../../styles/styles';
import FormattedMessageComponent from '../shared/FormattedMessage';

type SharedSectionProps = {
  sharedExpenses: SharedExpense[];
  currency: string;
};

export default function SharedSection({
  sharedExpenses,
  currency,
}: SharedSectionProps) {
  return (
    <View style={styles.categoriesContainer}>
      <View style={styles.categories}>
        <FormattedMessageComponent id="SHARED" style={styles.title} />
        {sharedExpenses.length !== 0 ? (
          sharedExpenses.map((expense) => (
            <View style={styles.expenseContainer} key={expense.id}>
              <View style={styles.icon}></View>
              <Text style={styles.element}>
                {expense.senderEmail}: {expense.amount} {expense.currency}
              </Text>
            </View>
          ))
        ) : (
          <FormattedMessageComponent id="SHARED_MSG" style={styles.text} />
        )}
        {}
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
  title: {
    ...STYLES.SECTION_TITLE,
  },
  expenseContainer: {
    ...STYLES.SECTION_ELEMENT_ROW_CONTINER,
  },
  element: {
    ...STYLES.SECTION_ELEMENT,
  },
  text: STYLES.PAGE_MESSAGE,
  icon: {
    ...STYLES.ICON,
  },
});

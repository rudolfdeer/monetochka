import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { defaultCategories } from '../constants/defaultCategories';
import { MESSAGES } from '../constants/messages';
import Navbar from './Navbar';

export default function CategoriesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Navbar title={'Categories'} message={MESSAGES.CATEGORIES} />
        <View style={styles.categoriesContainer}>
          <View style={styles.categories}>
            {defaultCategories.map((category) => (
              <View style={styles.rowContainer}>
                <View style={styles.categoryContainer} key={category.id}>
                  <View style={styles.icon}></View>
                  <Text style={styles.category}>{category.name}</Text>
                </View>
                <Pressable onPress={() => {}}>
                  <Text style={styles.button}>Edit</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
        <Pressable
          style={styles.buttonAdd}
          onPress={() => {}}
        >
          <Text style={styles.buttonAddText}>Add new category</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    width: '100%',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  categories: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 13,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  button: {
    fontSize: 12,
    lineHeight: 20,
    color: COLORS.BUTTON,
  },
  buttonAdd: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 13,
    backgroundColor: COLORS.BUTTON,
    marginHorizontal: 16,
  },
  buttonAddText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
});

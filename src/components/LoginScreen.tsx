import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StackParamList } from '../../App';
import { STYLES } from '../styles/styles';

type LoginScreenProps = {
  params: NativeStackScreenProps<StackParamList, 'Login'>;
  // categories: Category[];
  // setCategories: Function;
};

export default function LoginScreen({
  params,
}: // categories,
// setCategories,
LoginScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sectionContainer}>
        <View style={styles.section}>
          <Text style={styles.title}>Monetochka</Text>
          <Text style={styles.text}>
            Follow your expenses has never been this easier.
          </Text>
        </View>
        <View>
          <Pressable
            style={styles.button}
            onPress={() => params.navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Get started</Text>
          </Pressable>
          <Pressable style={styles.buttonLast} onPress={() => {}}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...STYLES.PAGE_CONTAINER,
  },
  sectionContainer: {
    ...STYLES.SECTION_CONTAINER,
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  section: {
    ...STYLES.SECTION,
    flex: 1,
    marginTop: 16,
  },
  title: {
    ...STYLES.PAGE_TITLE,
    marginBottom: 50,
    textAlign: 'center',
  },
  text: {
    ...STYLES.PAGE_MESSAGE,
    height: 'auto',
  },
  button: {
    ...STYLES.BUTTON_BIG,
    marginBottom: 16,
  },
  buttonText: {
    ...STYLES.BUTTON_BIG_TEXT,
  },
  buttonLast: {
    ...STYLES.BUTTON_BIG,
    marginBottom: 0,
  },
});

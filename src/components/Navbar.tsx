import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../styles/colors';
import { STYLES } from '../styles/styles';

type NavbarProps = {
  title: string;
  message: string;
};

export default function Navbar({ title, message }: NavbarProps) {
  return (
    <View style={styles.navbar}>
      <Text style={styles.textSmall}>{message}</Text>
      <Text style={styles.textBig}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    marginBottom: 24,
    marginTop: 10,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'flex-start',
  },
  textSmall: {
    ...STYLES.PAGE_MESSAGE,
  },
  textBig: {
    ...STYLES.PAGE_TITLE,
  },
});

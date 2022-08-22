import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/colors';

type NavbarProps = {
  title: string,
  message: string,
}

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
    fontSize: 17,
    height: 42,
    lineHeight: 22,
    color: COLORS.TEXT_SECONDARY,
  },
  textBig: {
    height: 42,
    fontWeight: '700',
    fontSize: 34,
    lineHeight: 41,
  },
});

import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/colors';

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      <Text style={styles.textSmall}>Hello!</Text>
      <Text style={styles.textBig}>Home</Text>
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

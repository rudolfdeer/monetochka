import { StyleSheet, View } from 'react-native';
import { STYLES } from '../../styles/styles';
import FormattedMessageComponent from './FormattedMessage';

type NavbarProps = {
  titleId: string;
  messageId: string;
};

export default function Navbar({ titleId, messageId }: NavbarProps) {
  return (
    <View style={styles.navbar}>
      <FormattedMessageComponent id={messageId} style={styles.textSmall} />
      <FormattedMessageComponent id={titleId} style={styles.textBig} />
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

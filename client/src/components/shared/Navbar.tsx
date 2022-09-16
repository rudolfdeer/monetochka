import { FormattedMessage } from 'react-intl';
import { StyleSheet, Text, View } from 'react-native';
import { LOCALES_EN } from '../../constants/locales/en';
import { STYLES } from '../../styles/styles';

type NavbarProps = {
  titleId: string;
  messageId: string;
};

export default function Navbar({ titleId, messageId }: NavbarProps) {
  return (
    <View style={styles.navbar}>
      <FormattedMessage id={messageId} defaultMessage={LOCALES_EN[messageId]}>
        {(msg) => <Text style={styles.textSmall}>{msg}</Text>}
      </FormattedMessage>
      <FormattedMessage id={titleId} defaultMessage={LOCALES_EN[titleId]}>
        {(msg) => <Text style={styles.textBig}>{msg}</Text>}
      </FormattedMessage>
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

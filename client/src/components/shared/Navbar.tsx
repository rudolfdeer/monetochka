import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { StackParamList } from '../../../App';
import * as SecureStore from 'expo-secure-store';
import { useSockets } from '../../helpers/useSockets';
import { STYLES } from '../../styles/styles';
import FormattedMessageComponent from './FormattedMessage';

type NavbarProps = {
  titleId: string;
  messageId: string;
  params: NativeStackScreenProps<StackParamList, 'Home' | 'Categories' | 'Settings'>;
};

export default function Navbar({ titleId, messageId, params }: NavbarProps) {
  const { actions } = useSockets();
  const handleLogOut = async () => {
    actions.logOut();
    await SecureStore.deleteItemAsync('jwt');
    params.navigation.navigate('Intro');
  };

  return (
    <View style={styles.navbarContainer}>
      <View style={styles.navbar}>
        <FormattedMessageComponent id={messageId} style={styles.textSmall} />
        <FormattedMessageComponent id={titleId} style={styles.textBig} />
      </View>
      <View style={styles.buttons}>
        <Pressable style={styles.button} onPress={handleLogOut}>
      <Image style={styles.icon} source={require('./logout.png')} />
      </Pressable>
      <Pressable style={[styles.button, { marginRight: 0 }]} onPress={() => params.navigation.navigate('Settings')}>
      <Image style={styles.icon} source={require('./settings.png')} />
      </Pressable>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    alignItems: 'flex-start',
    marginRight: 16,
  },
  textSmall: {
    ...STYLES.PAGE_MESSAGE,
  },
  textBig: {
    ...STYLES.PAGE_TITLE,
  },
  navbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 10,
    paddingHorizontal: 16,
  },
  button: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
  buttons: {
    flexDirection: 'row',
  }
});

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StackParamList } from '../../../App';
import { observer } from 'mobx-react';
import { STYLES } from '../../styles/styles';
import ModalLogIn from './ModalLogIn';
import ModalRegistration from './ModalRegistration';
import { FormattedMessage } from 'react-intl';
import { LOCALES_EN } from '../../constants/locales/en';
import { useStore } from '../../mobx/store';

type IntroScreenProps = NativeStackScreenProps<StackParamList, 'Intro'>;

function IntroScreen(props: IntroScreenProps) {
  const { changeLang } = useStore();

  const [modalLogInVisible, setModalLogInVisible] = useState(false);
  const [modalRegistrationVisible, setModalRegistrationVisible] =
    useState(false);

  const onChangeLanguage = (lang: string) => {
    changeLang(lang);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sectionContainer}>
        <ModalLogIn
          params={props}
          modalLogInVisible={modalLogInVisible}
          setModalLogInVisible={setModalLogInVisible}
        />
        <ModalRegistration
          params={props}
          modalRegistrationVisible={modalRegistrationVisible}
          setModalRegistrationVisible={setModalRegistrationVisible}
        />
        <View style={styles.section}>
          <View style={styles.langs}>
            <Pressable
              style={styles.buttonSmall}
              onPress={() => onChangeLanguage('en')}
            >
              <Text style={styles.lang}>EN</Text>
            </Pressable>
            <Pressable
              style={styles.buttonSmall}
              onPress={() => onChangeLanguage('fr')}
            >
              <Text style={styles.lang}>FR</Text>
            </Pressable>
          </View>
          <View>
            <FormattedMessage
              id="APP_TITLE"
              defaultMessage={LOCALES_EN.APP_TITLE}
            >
              {(msg) => <Text style={styles.title}>{msg}</Text>}
            </FormattedMessage>
            <FormattedMessage
              id="INTRO_SCREEN"
              defaultMessage={LOCALES_EN.INTRO_SCREEN}
            >
              {(msg) => <Text style={styles.text}>{msg}</Text>}
            </FormattedMessage>
          </View>
        </View>
        <View>
          <Pressable
            style={styles.button}
            onPress={() => setModalLogInVisible(true)}
          >
            <FormattedMessage id="LOG_IN" defaultMessage={LOCALES_EN.LOG_IN}>
              {(msg) => <Text style={styles.buttonText}>{msg}</Text>}
            </FormattedMessage>
          </Pressable>
          <Pressable onPress={() => setModalRegistrationVisible(true)}>
            <FormattedMessage
              id="REGISTER"
              defaultMessage={LOCALES_EN.REGISTER}
            >
              {(msg) => <Text style={styles.buttonSmall}>{msg}</Text>}
            </FormattedMessage>
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
    justifyContent: 'flex-start',
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
  buttonSmall: {
    ...STYLES.BUTTON_SMALL,
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  langs: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    marginBottom: 200,
  },
  lang: {
    marginRight: 20,
    borderRightColor: 'black',
  },
});

export default observer(IntroScreen);

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StackParamList } from '../../App';
import { IUser } from '../constants/interfaces';
import { STYLES } from '../styles/styles';
import ModalLogIn from './ModalLogIn';
import ModalRegistration from './ModalRegistration';

type IntroScreenProps = {
  params: NativeStackScreenProps<StackParamList, 'Intro'>;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
};

export default function IntroScreen({ params, setUser }: IntroScreenProps) {
  const [modalLogInVisible, setModalLogInVisible] = useState(false);
  const [modalRegistrationVisible, setModalRegistrationVisible] =
    useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sectionContainer}>
        <ModalLogIn
          params={params}
          setUser={setUser}
          modalLogInVisible={modalLogInVisible}
          setModalLogInVisible={setModalLogInVisible}
        />
        <ModalRegistration
          params={params}
          setUser={setUser}
          modalRegistrationVisible={modalRegistrationVisible}
          setModalRegistrationVisible={setModalRegistrationVisible}
          
        />
        <View style={styles.section}>
          <Text style={styles.title}>Monetochka</Text>
          <Text style={styles.text}>
            Follow your expenses has never been easier.
          </Text>
        </View>
        <View>
          <Pressable
            style={styles.button}
            onPress={() => setModalLogInVisible(true)}
          >
            <Text style={styles.buttonText}>Log in</Text>
          </Pressable>
          <Pressable onPress={() => setModalRegistrationVisible(true)}>
            <Text style={styles.buttonSmall}>Register</Text>
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
  buttonSmall: {
    ...STYLES.BUTTON_SMALL,
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

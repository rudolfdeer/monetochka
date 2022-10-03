import 'intl';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react';
import { IntlProvider } from 'react-intl';
import { Platform } from 'react-native';
import CategoriesScreen from './src/components/CategoriesScreen/CategoriesScreen';
import HomeScreen from './src/components/HomeScreen/HomeScreen';
import IntroScreen from './src/components/IntroScreen/IntroScreen';
import { LOCALES_EN } from './src/constants/locales/en';
import { LOCALES_FR } from './src/constants/locales/fr';
import { useStore } from './src/mobx/store';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { registerForPushNotifications } from './src/helpers/registerForPushNotifications';

export type StackParamList = {
  Home: undefined;
  Categories: undefined;
  Intro: undefined;
};

if (Platform.OS === 'android') {
  // See https://github.com/expo/expo/issues/6536 for this issue.
  if (typeof (Intl as any).__disableRegExpRestore === 'function') {
    (Intl as any).__disableRegExpRestore();
  }
}
import 'intl/locale-data/jsonp/en';
import { getLoggedInUser } from './src/helpers/api';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const i18nConfig = {
  locale: 'en',
  messages: LOCALES_EN,
};

const Stack = createNativeStackNavigator<StackParamList>();

function App() {
  const { currentLang, setLoggedInUser } = useStore();

  useEffect(() => {
    registerForPushNotifications();
    const fetchLoggedInUser = async () => {
      try {
        const user = await getLoggedInUser();
        setLoggedInUser(user);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    };
    fetchLoggedInUser();
  }, []);

  switch (currentLang) {
    case 'en':
      i18nConfig.messages = LOCALES_EN;
      break;
    case 'fr':
      i18nConfig.messages = LOCALES_FR;
      break;
    default:
      i18nConfig.messages = LOCALES_EN;
      break;
  }

  return (
    <IntlProvider
      messages={i18nConfig.messages}
      locale={i18nConfig.locale}
      defaultLocale="en"
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }}/>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Categories" component={CategoriesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </IntlProvider>
  );
}

export default observer(App);

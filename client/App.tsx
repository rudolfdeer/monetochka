import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from './src/components/CategoriesScreen';
import HomeScreen from './src/components/HomeScreen';
import IntroScreen from './src/components/IntroScreen';

export type StackParamList = {
  Home: undefined;
  Categories: undefined;
  Intro: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Intro" options={{ headerShown: false }}>
          {(props) => <IntroScreen params={props}/>}
        </Stack.Screen>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => (
            <HomeScreen params={props}/>
          )}
        </Stack.Screen>
        <Stack.Screen name="Categories">
          {(props) => (
            <CategoriesScreen />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

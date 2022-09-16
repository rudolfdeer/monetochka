import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from './src/components/CategoriesScreen/CategoriesScreen';
import HomeScreen from './src/components/HomeScreen/HomeScreen';
import IntroScreen from './src/components/IntroScreen/IntroScreen';

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
        <Stack.Screen  name="Intro" component={IntroScreen}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Categories" component={CategoriesScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

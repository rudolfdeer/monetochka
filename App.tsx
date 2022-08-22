import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from './src/components/CategoriesScreen';
import HomeScreen from './src/components/HomeScreen';

export type StackParamList = {
  Home: undefined;
  Categories: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

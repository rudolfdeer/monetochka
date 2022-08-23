import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import CategoriesScreen from './src/components/CategoriesScreen';
import HomeScreen from './src/components/HomeScreen';
import { Category, defaultCategories } from './src/constants/defaultCategories';

export type StackParamList = {
  Home: {
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  };
  Categories: {
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  };
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  const [categories, setCategories] = useState(defaultCategories);
  console.log(categories);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen
              params={props}
              categories={categories}
              setCategories={setCategories}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Categories">
          {(props) => (
            <CategoriesScreen
              params={props}
              categories={categories}
              setCategories={setCategories}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

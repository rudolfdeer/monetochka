import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import CategoriesScreen from './src/components/CategoriesScreen';
import HomeScreen from './src/components/HomeScreen';
import IntroScreen from './src/components/IntroScreen';
import { emptyUser } from './src/constants/emptyMocks';
import { IUser } from './src/constants/interfaces';

// ON MON-32 NOW !!!!!!!!!!!!!!!!!!!!!!!

export type StackParamList = {
  Home: {
    user: IUser;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
  };
  Categories: {
    user: IUser;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
  };
  Intro: {
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
  };
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  const [user, setUser] = useState(emptyUser);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Intro" options={{ headerShown: false }}>
          {(props) => <IntroScreen params={props} setUser={setUser} />}
        </Stack.Screen>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => (
            <HomeScreen params={props} user={user} setUser={setUser} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Categories">
          {(props) => (
            <CategoriesScreen params={props} user={user} setUser={setUser} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

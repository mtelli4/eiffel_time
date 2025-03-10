import React from 'react';
import {UserProvider} from './context/UserContext';
import RootNavigator from './navigation/RootNavigator';
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import { Login } from './screens/Login/SignIn';

function LoginScreen() {
  return (
    <Login />
  );
}

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Login',
  screens: {
    Login: LoginScreen,
    App: RootNavigator
  },
});

const Navigation = createStaticNavigation(RootStack);

const App = () => {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
};

export default App;

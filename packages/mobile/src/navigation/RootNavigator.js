import {
  NavigationContainer,
  NavigationIndependentTree,
} from '@react-navigation/native';
import * as React from 'react';
import {enableScreens} from 'react-native-screens';
import TabNavigator from './TabNavigator/index';

enableScreens();
const RootNavigator = () => {
  return (
      <TabNavigator />
  );
};

export default RootNavigator;

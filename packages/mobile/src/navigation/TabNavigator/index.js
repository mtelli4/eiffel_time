import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import Attendance from '../../screens/Attendance';
import Grades from '../../screens/Grades';
import Schedule from '../../screens/Schedule';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Schedule" component={Schedule} />
      <Tab.Screen name="Grades" component={Grades} />
      <Tab.Screen name="Attendance" component={Attendance} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

//import {Admin} from '../../../../shared/src/pages/Admin/Admin';
import {ClassAverages} from '../../../../shared/src/pages/Class/ClassAverages';
import {ClassGrades} from '../../../../shared/src/pages/Class/ClassGrades';
import Schedule from '../../screens/Schedule';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Schedule" component={Schedule} />
      <Tab.Screen name="Notes" component={ClassGrades} />
      <Tab.Screen name="Moyennes" component={ClassAverages} />
      {/* <Tab.Screen name="Admin" component={Admin} /> */}
    </Tab.Navigator>
  );
};

export default TabNavigator;

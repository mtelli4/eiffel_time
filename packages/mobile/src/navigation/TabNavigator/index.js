import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ClassAverages} from '../../../../shared/src/pages/Class/ClassAverages';
import {ClassGrades} from '../../../../shared/src/pages/Class/ClassGrades';
import Schedule from '../../screens/Schedule';

const Tab = createBottomTabNavigator();
const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'Schedule':
      iconName = 'calendar';
      break;
    case 'Notes':
      iconName = 'clipboard-list';
      break;
    case 'Moyennes':
      iconName = 'graduation-cap';
      break;
    default:
      break;
  }

  return <FontAwesome5 name={iconName} color={color} size={24} />;
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => screenOptions(route, color),
        tabBarStyle: {
          backgroundColor: '#2E3494',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
        activeTintColor: '#2E3494',
        inactiveTintColor: '#2E3494',
        style: {
          borderTopColor: '#66666666',
          backgroundColor: 'darkslateblue',
          elevation: 0,
        },
      })}

      // tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Schedule" component={Schedule} />
      <Tab.Screen name="Notes" component={ClassGrades} />
      <Tab.Screen name="Moyennes" component={ClassAverages} />
    </Tab.Navigator>
  );
};
export default TabNavigator;

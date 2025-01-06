import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {ClassAverages} from '../../../../shared/src/pages/Class/ClassAverages';
import {ClassGrades} from '../../../../shared/src/pages/Class/ClassGrades';
import {Schedule} from '../../../../shared/src/pages/Schedule/Schedule';

const Tab = createBottomTabNavigator();
const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'Emploi du temps':
      iconName = 'calendar';
      break;
    case 'Gestion des notes':
      iconName = 'clipboard-list';
      break;
    case 'Moyennes':
      iconName = 'graduation-cap';
      break;
    case 'Messagerie':
      iconName = 'comment-dots';
      break;
    case 'Réglages':
      iconName = 'gear';
      break;
    case 'Administration':
      iconName = 'toolbox';
      break;
    default:
      break;
  }

  return <FontAwesome6 name={iconName} color={color} size={24} />;
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
      <Tab.Screen name="Emploi du temps" component={Schedule} />
      <Tab.Screen name="Gestion des notes" component={ClassGrades} />
      <Tab.Screen name="Moyennes" component={ClassAverages} />
      <Tab.Screen name="Messagerie" component={Schedule} />
      <Tab.Screen name="Réglages" component={Schedule} />
      <Tab.Screen name="Administration" component={Schedule} />
    </Tab.Navigator>
  );
};
export default TabNavigator;

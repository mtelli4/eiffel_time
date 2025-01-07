import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {ClassAverages} from '../../../../shared/src/pages/Averages/ClassAverages';
import {ClassGrades} from '../../../../shared/src/pages/Grades/GradesManagement/ClassGrades';
import {Schedule} from '../../../../shared/src/pages/Schedule/Schedule';

const Tab = createBottomTabNavigator();
const screenOptions = (route, color) => {
  let iconName;
  let iconSource = 'FontAwesome6';

  switch (route.name) {
    case 'Emploi du temps':
      iconName = 'calendar';
      iconSource = 'Feather';
      break;
    case 'Gestion des notes':
      iconName = 'clipboard';
      iconSource = 'Feather';
      break;
    case 'Moyennes':
      iconName = 'graduation';
      iconSource = 'SimpleLineIcons';
      break;
    case 'Messagerie':
      iconName = 'message1';
      iconSource = 'AntDesign';
      break;
    case 'Réglages':
      iconName = 'settings';
      iconSource = 'Feather';
      break;
    case 'Administration':
      iconName = 'tool';
      iconSource = 'Feather';
      break;
    default:
      break;
  }

  return iconSource === 'Feather' ? (
    <Feather name={iconName} color={color} size={24} />
  ) : iconSource === 'SimpleLineIcons' ? (
    <SimpleLineIcons name={iconName} color={color} size={24} />
  ) : iconSource === 'AntDesign' ? (
    <AntDesign name={iconName} color={color} size={24} />
  ) : (
    <FontAwesome6 name={iconName} color={color} size={24} />
  );
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
      <Tab.Screen
        name="Emploi du temps"
        component={Schedule}
        options={{
          headerTintColor: '#2E3494',
        }}
      />
      <Tab.Screen
        name="Gestion des notes"
        component={ClassGrades}
        options={{
          headerTintColor: '#2E3494',
        }}
      />
      <Tab.Screen
        name="Moyennes"
        component={ClassAverages}
        options={{
          headerTintColor: '#2E3494',
        }}
      />
      <Tab.Screen
        name="Messagerie"
        component={Schedule}
        options={{
          headerTintColor: '#2E3494',
        }}
      />
      <Tab.Screen
        name="Réglages"
        component={Schedule}
        options={{
          headerTintColor: '#2E3494',
        }}
      />
      <Tab.Screen
        name="Administration"
        component={Schedule}
        options={{
          headerTintColor: '#2E3494',
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;

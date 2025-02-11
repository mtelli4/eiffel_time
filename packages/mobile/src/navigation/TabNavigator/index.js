import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useContext} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Admin} from '../../../../shared/src/pages/Admin/Admin';
import {Absences} from '../../../../shared/src/pages/Attendance/StudentAbsences';
import {TeacherAttendance} from '../../../../shared/src/pages/Attendance/TeacherAttendance';
import {ClassAverages} from '../../../../shared/src/pages/Averages/ClassAverages';
import {ClassGrades} from '../../../../shared/src/pages/Grades/GradesManagement/ClassGrades';
import {Grades} from '../../../../shared/src/pages/Grades/StudentGradestest';
import {Schedule} from '../../../../shared/src/pages/Schedule/Schedule';
import {Settings} from '../../../../shared/src/pages/Settings/Settings';
import {UserContext} from '../../context/UserContext'; // Exemple de contexte utilisateur
import {ManageAbsences} from '../../screens/ManageAbsences';
import {Messages} from '../../screens/Messaging/Messages';

const Tab = createBottomTabNavigator();

// Configuration des onglets par rôle
const TABS_CONFIG = {
  student: [
    {
      name: 'Emploi du temps',
      component: Schedule,
      icon: {name: 'calendar', source: 'Feather'},
    },
    {
      name: 'Absences',
      component: Absences,
      icon: {name: 'user-check', source: 'Feather'},
    },
    {
      name: 'Notes',
      component: Grades,
      icon: {name: 'clipboard', source: 'Feather'},
    },
    // {
    //   name: 'Messagerie',
    //   component: Schedule,
    //   icon: {name: 'message1', source: 'AntDesign'},
    // },
    // {
    //   name: 'Réglages',
    //   component: Schedule,
    //   icon: {name: 'settings', source: 'Feather'},
    // },
  ],
  teacher: [
    {
      name: 'Emploi du temps',
      component: Schedule,
      icon: {name: 'calendar', source: 'Feather'},
    },
    {
      name: 'Gestion des notes',
      component: ClassGrades,
      icon: {name: 'clipboard', source: 'Feather'},
    },
    {
      name: 'Moyennes',
      component: ClassAverages,
      icon: {name: 'graduation', source: 'SimpleLineIcons'},
    },
    // {
    //   name: 'Messagerie',
    //   component: Schedule,
    //   icon: {name: 'message1', source: 'AntDesign'},
    // },
    // {
    //   name: 'Réglages',
    //   component: Schedule,
    //   icon: {name: 'settings', source: 'Feather'},
    // },
  ],
  secretary: [
    {
      name: 'Moyennes',
      component: ClassAverages,
      icon: {name: 'graduation', source: 'SimpleLineIcons'},
    },
    // {
    //   name: 'Absences et Retards',
    //   component: ClassGrades,
    //   icon: {name: 'user-check', source: 'Feather'},
    // },
    // {
    //   name: 'Présences professeurs',
    //   component: ClassAverages,
    //   icon: {name: 'users', source: 'Feather'},
    // },
    // {
    //   name: 'Messagerie',
    //   component: Schedule,
    //   icon: {name: 'message1', source: 'AntDesign'},
    // },
    // {
    //   name: 'Réglages',
    //   component: Schedule,
    //   icon: {name: 'settings', source: 'Feather'},
    // },
  ],
  manager: [
    {
      name: 'Schedule',
      component: Schedule,
      icon: {name: 'calendar', source: 'Feather'},
    },
    {
      name: 'Grades',
      component: ClassGrades,
      icon: {name: 'clipboard', source: 'Feather'},
    },
    {
      name: 'Moyennes',
      component: ClassAverages,
      icon: {name: 'graduation', source: 'SimpleLineIcons'},
    },
    // {
    //   name: 'Absences et Retards',
    //   component: ClassGrades,
    //   icon: {name: 'user-check', source: 'Feather'},
    // },
    // {
    //   name: 'Présences professeurs',
    //   component: ClassAverages,
    //   icon: {name: 'users', source: 'Feather'},
    // },
    // {
    //   name: 'Messagerie',
    //   component: Schedule,
    //   icon: {name: 'message1', source: 'AntDesign'},
    // },
    // {
    //   name: 'Réglages',
    //   component: Schedule,
    //   icon: {name: 'settings', source: 'Feather'},
    // },
    {
      name: 'Gestion des utilisateurs',
      component: Admin,
      icon: {name: 'tool', source: 'Feather'},
    },
  ],

  admin: [
    {
      name: 'Schedule',
      component: Schedule,
      icon: {name: 'calendar', source: 'Feather'},
    },
    {
      name: 'Grades',
      component: ClassGrades,
      icon: {name: 'clipboard', source: 'Feather'},
    },
    {
      name: 'Moyennes',
      component: ClassAverages,
      icon: {name: 'graduation', source: 'SimpleLineIcons'},
    },
    {
      name: 'Absences et Retards',
      component: ManageAbsences,
      icon: {name: 'user-check', source: 'Feather'},
    },
    {
      name: 'Présences professeurs',
      component: TeacherAttendance,
      icon: {name: 'users', source: 'Feather'},
    },
    {
      name: 'Messagerie',
      component: Messages,
      icon: {name: 'message1', source: 'AntDesign'},
    },
    {
      name: 'Réglages',
      component: Settings,
      icon: {name: 'settings', source: 'Feather'},
    },
    {
      name: 'Gestion des utilisateurs',
      component: Admin,
      icon: {name: 'tool', source: 'Feather'},
    },
  ],
};

// Génération de l'icône en fonction de la configuration
const getTabIcon = (icon, color) => {
  const {name, source} = icon;
  switch (source) {
    case 'Feather':
      return <Feather name={name} color={color} size={24} />;
    case 'SimpleLineIcons':
      return <SimpleLineIcons name={name} color={color} size={24} />;
    case 'AntDesign':
      return <AntDesign name={name} color={color} size={24} />;
    case 'FontAwesome6':
    default:
      return <FontAwesome6 name={name} color={color} size={24} />;
  }
};

const TabNavigator = () => {
  const {role} = useContext(UserContext); // Exemple pour récupérer le rôle

  // Obtenez les onglets pour le rôle actuel
  const tabs = TABS_CONFIG[role] || [];

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          const tabConfig = tabs.find(tab => tab.name === route.name);
          return tabConfig ? getTabIcon(tabConfig.icon, color) : null;
        },
        tabBarStyle: {
          backgroundColor: '#2E3494',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
      })}>
      {tabs.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            headerTintColor: '#2E3494',
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;

// /index.js (à la racine)
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import RootNavigator from './src/navigation/RootNavigator';

AppRegistry.registerComponent(appName, () => RootNavigator);

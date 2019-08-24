import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';

/* eslint no-console: 0 */
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);

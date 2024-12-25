/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import './Src/Languages/index';
LogBox.ignoreLogs([
    'react-i18next:: You will need to pass in an i18next instance by using initReactI18next',
    'Warning: CountryModal: Support for defaultProps will be removed from function components in a future major release.',
    'DebuggerInternal',
    'nativeFabricUIManager',
    'clearTimeout'
]);

AppRegistry.registerComponent(appName, () => App);
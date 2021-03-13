if (__DEV__) {
  import('./src/utils/Reactron').then(() => console.log('Reactotron Configured'))
}
import 'react-native-gesture-handler';

import { AppRegistry, LogBox } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

LogBox.ignoreAllLogs()
AppRegistry.registerComponent(appName, () => App);
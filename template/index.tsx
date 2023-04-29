import { AppRegistry, LogBox } from 'react-native';
import App from './src/App';
import React from 'react'
import { name as appName } from './app.json';
import { NetworkStatusProvider } from 'context/NetworkStatusContext';

const AppContainer = () => {

  return (
    <NetworkStatusProvider>
      <App />
    </NetworkStatusProvider>

  )
}

function HeadlessCheck({ isHeadless }: { isHeadless: boolean }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <AppContainer />;
}

LogBox.ignoreAllLogs()
AppRegistry.registerComponent(appName, () => HeadlessCheck);

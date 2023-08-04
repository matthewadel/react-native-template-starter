import 'react-native-gesture-handler';
import { AppRegistry, LogBox } from 'react-native';
import App from './src/App';
import React from 'react'
import { name as appName } from './app.json';
import { NetworkStatusProvider } from 'context/NetworkStatusContext';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from 'navigation/useNavigationHook';
import { Provider } from 'react-redux';
import { store, persistor } from 'store';
import { PersistGate } from 'redux-persist/integration/react';

const AppContainer = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NetworkStatusProvider>
          <NavigationContainer ref={navigationRef}>
            <App />
          </NavigationContainer>
        </NetworkStatusProvider>
      </PersistGate>
    </Provider>
  )
}

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <AppContainer />;
}

LogBox.ignoreAllLogs()
AppRegistry.registerComponent(appName, () => HeadlessCheck);

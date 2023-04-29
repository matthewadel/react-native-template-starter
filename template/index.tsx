import { AppRegistry, LogBox } from 'react-native';
import App from './src/App';
import React from 'react'
import { name as appName } from './app.json';
import { NetworkStatusProvider } from 'context/NetworkStatusContext';
import { store, persistor } from 'store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator, View, } from 'react-native'

const AppContainer = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={<View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>} persistor={persistor}>
        <NetworkStatusProvider>
          <App />
        </NetworkStatusProvider>
      </PersistGate>
    </Provider>

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

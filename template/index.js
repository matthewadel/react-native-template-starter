import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import App from '@/app';
import { NetworkStatusProvider } from '@/context';
import { navigationRef } from '@/navigation/use-navigation-handler';
import { store } from '@/store';

import { name as appName } from './app.json';

function AppContainer() {
  return (
    <Provider store={store}>
      <NetworkStatusProvider>
        <NavigationContainer ref={navigationRef}>
          <App />
        </NavigationContainer>
      </NetworkStatusProvider>
    </Provider>
  );
}
AppRegistry.registerComponent(appName, () => AppContainer);

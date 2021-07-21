import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppStack from './navigation/AppStack';
import { store, persistor } from 'store';
import { SetNotchHeight } from 'store/Actions';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SafeArea from 'react-native-safe-area';
import reactotron from 'utils/Reactron';
import I18n from "react-native-i18n";
import LocalizationContext from 'lang/i18n';
import Orientation from 'react-native-orientation';
import FlashMessage from "react-native-flash-message";
import FlashMsg from 'UI/FlashMsg';
// import { SetNotchHeight } from 'store/Actions';

const App = () => {

  const [locale, setLocale] = React.useState(I18n.locale);
  const localizationContext = React.useMemo(
    () => ({
      t: (scope: any, options?: any) => I18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    }),
    [locale]
  );

  useEffect(() => {

    //1- setting the notch
    // const getNotchHeight = async () => {
    //   let result = await SafeArea.getSafeAreaInsetsForRootView()
    //  store.dispatch(SetNotchHeight({ top: (result.safeAreaInsets.top || 0), bottom: (result.safeAreaInsets.bottom || 0) }))
    // }

    // if (store.getState().App.notch.top === null)
    //   getNotchHeight()

    // 2- setting the language
    setTimeout(() => {
      I18n.locale = store.getState().App.lang
      setLocale(store.getState().App.lang)
    }, 100);

    Orientation.lockToPortrait();

  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={<View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>} persistor={persistor}>
        <SafeAreaProvider>
          <LocalizationContext.Provider value={localizationContext}>
            <NavigationContainer>
              <AppStack />
            </NavigationContainer>
          </LocalizationContext.Provider>
        </SafeAreaProvider>

        <FlashMessage duration={4000} animationDuration={500} autoHide={true} hideOnPress={true} position="top" MessageComponent={(msg) => (<FlashMsg msg={msg} />)} />
      </PersistGate>
    </Provider>
  );
};

// export default App;
export default reactotron.overlay(App)

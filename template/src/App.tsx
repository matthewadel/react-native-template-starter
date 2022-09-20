import React, { useEffect } from 'react';
import { ActivityIndicator, View, Platform, } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppStack from './navigation/AppStack';
import { store, persistor } from 'store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import reactotron from 'utils/Reactron';
import I18n from "react-native-i18n";
import LocalizationContext from 'lang/i18n';
import Orientation from 'react-native-orientation';
import FlashMessage from "react-native-flash-message";
import { FlashMsg, Modal, ModalRef } from 'UI';
import { PERMISSIONS, RESULTS, request, check } from 'react-native-permissions';
import { Settings } from 'react-native-fbsdk-next';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";
import codePush from "react-native-code-push";
import crashlytics from '@react-native-firebase/crashlytics';

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

  PushNotification.configure({
    onNotification: function () {
      console.log('notifications')
    },
  })

  useEffect(() => {

    // 1- setting the language
    setTimeout(() => {
      I18n.locale = store.getState().App.lang
      setLocale(store.getState().App.lang)
    }, 100);

    Orientation.lockToPortrait();

    // 2- notifications request and set local notifications
    requestNotificationsPermission()

    // 3- request to collect data and init fbsdk
    initFBSdk()

    // 4- set crashlytics
    crashlytics()
      .setCrashlyticsCollectionEnabled(true)
      .then(() => console.log('crashlytics enabled'))
      .catch(e => console.log(e))

  }, [])

  const initFBSdk = async () => {
    if (Platform.OS === 'ios') {
      const ATT_CHECK = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);

      if (ATT_CHECK === RESULTS.DENIED) {
        console.log('RESULTS.DENIED')
        try {
          const ATT = await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
          if (ATT === RESULTS.GRANTED) {
            console.log('RESULTS.GRANTED')
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    Settings.initializeSDK();
    Settings.setAdvertiserTrackingEnabled(true);

  }

  const requestNotificationsPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {

      messaging().onMessage(async remoteMessage => {

        // showMessage({
        //   message: remoteMessage.notification?.body || "",
        //   type: "success",
        //   onPress: () => navigate('Notifications')
        // })
        console.log(remoteMessage.notification?.title)
        console.log(remoteMessage.notification?.body)
        PushNotification.localNotification({
          title: remoteMessage.notification?.title,
          message: remoteMessage.notification?.body || "",
          playSound: true,
        })
      });

      await messaging().registerDeviceForRemoteMessages()
        .then(() => {
          messaging().getToken()
            .then(token => {
              console.log(token)
            })
            .catch(e => console.log(e))
        })
        .catch(data => console.log(data))
    }
  }

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

        <Modal ref={ModalRef} />
        <FlashMessage duration={4000} animationDuration={500} autoHide={true} hideOnPress={true} position="top" MessageComponent={(msg) => (<FlashMsg msg={msg} />)} />
      </PersistGate>
    </Provider>
  );
};

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };
export default codePush(codePushOptions)(reactotron.overlay(App))
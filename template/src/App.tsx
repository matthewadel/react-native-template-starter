import React, { useContext, useEffect } from 'react';
import { Platform, } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppStack from './navigation/AppStack';
import { store } from 'store';
import Reactotron from 'utils/Reactron';
import I18n from "react-native-i18n";
import LocalizationContext from 'lang/i18n';
import Orientation from 'react-native-orientation';
import FlashMessage from "react-native-flash-message";
import { FlashMsg, Modal, ModalRef, RFValue } from 'UI';
import { PERMISSIONS, RESULTS, request, check, requestNotifications } from 'react-native-permissions';
import { Settings } from 'react-native-fbsdk-next';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import codePush from "react-native-code-push";
import crashlytics from '@react-native-firebase/crashlytics';
import { ToastProvider } from 'react-native-toast-notifications'
import { useNetInfo } from "@react-native-community/netinfo";
import { NetworkStatusStore } from 'context';

const App: any = () => {

  const [locale, setLocale] = React.useState(I18n.locale);
  const netInfo = useNetInfo()
  const { dispatch } = useContext(NetworkStatusStore)
  const localizationContext = React.useMemo(
    () => ({
      t: (scope: any, options?: any) => I18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    }),
    [locale]
  );

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

  useEffect(() => {
    if (netInfo.isInternetReachable) {
      dispatch({
        type: "SET_NETOWORK_STATE",
        payload: -1
      })

      setTimeout(() => {
        dispatch({
          type: "SET_NETOWORK_STATE",
          payload: 1
        })
      }, 2000);
    }
    else if (netInfo.isInternetReachable != null) {
      dispatch({
        type: "SET_NETOWORK_STATE",
        payload: 0
      })
    }

    console.log(`isInternetReachable is ${netInfo.isInternetReachable}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [netInfo])

  const initFBSdk = async () => {
    Settings.initializeSDK();
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
    Settings.setAdvertiserTrackingEnabled(true);

  }

  const requestNotificationsPermission = async () => {

    let enabled = false
    if (Platform.OS == 'ios') {
      const authStatus = await messaging().requestPermission();
      enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    }
    else {
      requestNotifications(['alert', 'sound']).then(({ status }) => {
        enabled = status == 'granted'
        console.log(status);
      });
    }

    if (enabled) {

      if (Platform.OS == 'android')
        await notifee.createChannel({
          id: 'default',
          name: 'default',
          vibration: true,
        })

      messaging().onMessage(async remoteMessage => {

        notifee.displayNotification({
          data: { ...remoteMessage.data },
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body || "",
          android: {
            channelId: 'default',
            pressAction: {
              id: 'default',
            },
            importance: AndroidImportance.HIGH,
          }
        });
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

  const renderMessagesComponent = (msg: any) => {
    return (<FlashMsg msg={msg} />)
  }

  return (
    <ToastProvider warningColor="#FBCF13" offsetBottom={RFValue(60)} placement="bottom" duration={2000} swipeEnabled={false} animationType="slide-in">

      <SafeAreaProvider>
        <LocalizationContext.Provider value={localizationContext}>
          <AppStack />
        </LocalizationContext.Provider>
        <Modal ref={ModalRef} />
        <FlashMessage duration={4000} animationDuration={500} autoHide={true} hideOnPress={true} position="top" MessageComponent={renderMessagesComponent} />
      </SafeAreaProvider>


    </ToastProvider>
  );
};

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };
export default __DEV__ ? Reactotron.overlay(App) : codePush(codePushOptions)(App)

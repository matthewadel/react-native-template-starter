import notifee, { AndroidImportance } from '@notifee/react-native';
import NetInfo from '@react-native-community/netinfo';
import crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';
import React, { useContext, useEffect } from 'react';
import { Platform } from 'react-native';
import { getLanguage } from 'react-native-localization-settings';
import Orientation from 'react-native-orientation-locker';
import { requestNotifications } from 'react-native-permissions';

import { AuthStack } from '@/navigation';
import { getCurrentLanguage, initI18n, useChangeLanguage } from '@/translation';

import { NetworkStatusStore } from './context';

initI18n();
const App = () => {
  const { toggleLanguage } = useChangeLanguage();
  let lang = getLanguage();
  const { dispatch } = useContext(NetworkStatusStore);

  useEffect(() => {
    if (Platform.OS === 'ios') Orientation.lockToPortrait();

    requestNotificationsPermission();

    enableCrashlytics();

    let networkObserver = CheckNetworkConnectivity();
    return () => networkObserver();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getCurrentLanguage(lang) !== getCurrentLanguage()) {
      toggleLanguage(getCurrentLanguage(lang));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const requestNotificationsPermission = async () => {
    let enabled = false;
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    } else {
      requestNotifications(['alert', 'sound']).then(({ status }) => {
        enabled = status === 'granted';
        console.log(status);
      });
    }

    if (enabled) {
      if (Platform.OS === 'android')
        await notifee.createChannel({
          id: 'default',
          name: 'default',
          vibration: true,
        });

      messaging().onMessage(async (remoteMessage) => {
        notifee.displayNotification({
          data: { ...remoteMessage.data },
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body || '',
          android: {
            channelId: 'default',
            pressAction: {
              id: 'default',
            },
            importance: AndroidImportance.HIGH,
          },
        });
      });

      await messaging()
        .registerDeviceForRemoteMessages()
        .then(() => {
          messaging()
            .getToken()
            .then((token) => {
              console.log(token);
            })
            .catch((e) => console.log(e));
        })
        .catch((data) => console.log(data));
    }
  };

  const CheckNetworkConnectivity = () => {
    return NetInfo.addEventListener((res) => {
      if (res.isConnected) {
        dispatch({
          type: 'SET_NETOWORK_STATE',
          payload: 1,
        });
      } else
        dispatch({
          type: 'SET_NETOWORK_STATE',
          payload: 0,
        });
    });
  };

  const enableCrashlytics = () => {
    crashlytics()
      .setCrashlyticsCollectionEnabled(true)
      .then(() => console.log('crashlytics enabled'))
      .catch((e) => console.log(e));
  };

  return <AuthStack />;
};

export default App;

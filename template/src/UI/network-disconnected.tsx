import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated } from 'react-native';
import { StyleSheet } from 'react-native';
import { s, vs } from 'react-native-size-matters';

import { NetworkStatusStore } from '@/context';
import { Colors, Text } from '@/ui';
const NetworkDisconnected = () => {
  const { state } = useContext(NetworkStatusStore);
  const [networkLabelHeight] = useState(new Animated.Value(0));
  const { t } = useTranslation();

  useEffect(() => {
    if (state.isInternetReachable === 0)
      Animated.timing(networkLabelHeight, {
        toValue: vs(40),
        duration: 1,
        useNativeDriver: false,
      }).start();
    else if (state.isInternetReachable === 1)
      setTimeout(() => {
        Animated.timing(networkLabelHeight, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }).start();
      }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isInternetReachable]);

  const dynamicStyle = {
    height: networkLabelHeight,
    marginBottom: state.isInternetReachable ? 0 : vs(20),
    backgroundColor:
      state.isInternetReachable === 0 ? Colors().App.Red : Colors().App.Green,
  };
  return (
    <Animated.View style={[dynamicStyle, styles.containerStyle]}>
      <Text style={{ color: Colors().Text.White, fontSize: s(12) }}>
        {state.isInternetReachable === 0
          ? t('UI.noInternet')
          : t('UI.BackOnline')}
      </Text>
    </Animated.View>
  );
};

export { NetworkDisconnected };

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

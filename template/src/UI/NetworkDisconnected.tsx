import { Colors, RFValue, Text } from 'UI'
import { NetworkStatusStore } from 'context/NetworkStatusContext'
import React, { useContext, useEffect, useState } from 'react'
import { Animated } from 'react-native'
import { useLanguage } from 'lang/useLanguage';

const NetworkDisconnected = () => {
  const { state } = useContext(NetworkStatusStore)
  const [networkLabelHeight] = useState(new Animated.Value(0))
  const { t } = useLanguage()

  useEffect(() => {
    if (state.isInternetReachable == 0)
      Animated.timing(networkLabelHeight, {
        toValue: RFValue(40),
        duration: 1,
        useNativeDriver: false
      }).start()
    else if (state.isInternetReachable == 1)
      Animated.timing(networkLabelHeight, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }).start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isInternetReachable])

  return (
    <Animated.View style={{ marginBottom: state.isInternetReachable ? 0 : RFValue(20), height: networkLabelHeight, backgroundColor: state.isInternetReachable == 0 ? Colors().App.Red : Colors().App.Green, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: Colors().Text.White, fontSize: RFValue(12) }}>{state.isInternetReachable == 0 ? t('UI.noInternet') : t('UI.BackOnline')}</Text>
    </Animated.View>
  )
}

export { NetworkDisconnected }
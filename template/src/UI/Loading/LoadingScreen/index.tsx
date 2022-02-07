import React from 'react'
import { Colors, View } from 'UI'
import { LineDotsLoader } from 'react-native-indicator'

interface ILoadingScreen {
  style?: any
}
const LoadingScreen = (props: ILoadingScreen) => {
  return (
    <View style={[{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }, props.style]}>
      <LineDotsLoader color={Colors().App.Primary} />
    </View>
  )
}

export { LoadingScreen }
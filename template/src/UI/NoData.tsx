import React from 'react'
import { Text, View } from 'UI'
import I18n from "react-native-i18n";

export const NoData = (props: { style?: any, textString?: string }) => {

  return (
    <View style={[{ justifyContent: 'center', flex: 1, alignItems: 'center', width: '100%' }, props.style]}>
      <Text numberOfLines={0} style={{ textAlign: 'center' }}>{props.textString || I18n.t('UI.noData')}</Text>
    </View>
  )
}
import { Button, Colors, RFValue, Text, View } from 'UI'
import React from 'react'
import I18n from 'react-native-i18n';

export const Alert = ({ title, body, yesTitle, noTitle, onPress, closeModal }: { title?: string, body: string, yesTitle?: string, noTitle?: string, onPress: Function, closeModal: Function }) => {

  return (
    <View style={{ paddingHorizontal: RFValue(20), paddingVertical: RFValue(30), borderRadius: RFValue(16), width: '80%', backgroundColor: Colors().App.White }}>
      {!!title && <Text numberOfLines={0} style={{ textAlign: "center" }}>{title}</Text>}
      <Text numberOfLines={0} style={{ textAlign: "center" }}>{body}</Text>

      <View style={{ marginTop: RFValue(30), flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
        <Button style={{ width: '47%' }} onPress={onPress}>{yesTitle || I18n.t('UI.Yes')}</Button>
        <Button style={{ width: '47%' }} onPress={closeModal}>{noTitle || I18n.t('UI.No')}</Button>
      </View>
    </View>
  )
}
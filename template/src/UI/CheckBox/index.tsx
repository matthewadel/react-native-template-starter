import React from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import RNCheckbox from 'react-native-checkbox-animated'
import { RFValue, Colors } from 'UI'
import * as Animatable from 'react-native-animatable';
import { store } from 'store';

interface ICheckBox {
  label?: string
  checkedBackgroundColor?: string
  unCheckedBorderColor?: string
  checked: boolean
  hasError?: boolean
  onValueChange?: Function
  size?: number
  labelContainerStyle?: any
  labelStyle?: StyleProp<TextStyle>
  checkStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
  customMarker?: React.ReactNode
  checkMarkSize?: number
}

const CheckBox = (props: ICheckBox) => {

  return (
    <Animatable.View style={[{ alignItems: 'center', }, props.containerStyle]} animation={props.hasError ? 'shake' : ''}>
      <RNCheckbox
        label={props.label || ''}
        containerStyle={{ flexDirection: store.getState().App.lang == 'ar' ? 'row-reverse' : 'row' }}
        checked={props.checked}
        onValueChange={(x: boolean) => props.onValueChange ? props.onValueChange(x) : false}
        // checkedBackgroundColor={props.checkedBackgroundColor || Colors().App.backgroundColor}
        // unCheckedBackgroundColor={props.checkedBackgroundColor || Colors().App.backgroundColor}
        // unCheckedBorderColor={props.unCheckedBorderColor || Colors().App.backgroundColor}
        checkedBorderColor={Colors().App.Primary}
        size={props.size}
        labelContainerStyle={[{ flex: 0, }, store.getState().App.lang == 'ar' ? { marginRight: RFValue(10) } : { marginLeft: RFValue(10) }, props.labelContainerStyle]}
        labelStyle={[{ padding: 0, fontSize: RFValue(14) }, props.labelStyle]}
        checkboxContainerStyle={{ padding: 0, }}
        checkStyle={[{ color: Colors().Text.Primary, fontSize: RFValue(20), }, props.checkStyle]}
        customMarker={props.customMarker}
        boxStyle={{ width: RFValue(32), height: RFValue(32) }}
      />
    </Animatable.View>
  )

}

export { CheckBox }

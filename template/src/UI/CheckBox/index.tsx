import React from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import RNCheckbox from 'react-native-checkbox-animated'
import { RFValue, Colors } from 'UI'

interface ICheckBox {
  label?: string
  checkedBackgroundColor?: string
  unCheckedBorderColor?: string
  checked: boolean
  onValueChange?: (val: boolean) => boolean
  size?: number
  labelStyle?: StyleProp<TextStyle>
  checkStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
  customMarker?: React.ReactNode
  checkMarkSize?: number
}

const CheckBox = (props: ICheckBox) => {

  return (
    <RNCheckbox
      label={props.label || ''}
      checked={props.checked}
      onValueChange={(x: boolean) => props.onValueChange ? props.onValueChange(x) : false}
      checkedBackgroundColor={props.checkedBackgroundColor}
      unCheckedBorderColor={props.unCheckedBorderColor}
      rounded
      size={props.size}
      checkMarkSize={props.checkMarkSize || RFValue(20)}
      labelContainerStyle={{ flex: 0, }}
      labelStyle={[{ padding: 0 }, props.labelStyle]}
      checkboxContainerStyle={{ padding: 0, }}
      containerStyle={[{ alignItems: 'center', }, props.containerStyle]}
      checkStyle={[{ color: Colors().Text.White, fontSize: RFValue(18), }, props.checkStyle]}
      customMarker={props.customMarker}
      borderWidth={props.checked ? 1 : 5}
    />
  )

}

export { CheckBox }

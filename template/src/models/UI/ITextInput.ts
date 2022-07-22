import { TextInputProps, TextStyle } from "react-native";

export interface ITextInput extends TextInputProps {
  textInputStyle?: TextStyle | TextStyle[],
  labelStyle?: TextStyle | TextStyle[],
  togglePasswordButton?: boolean
  noDirectionChange?: boolean
  label?: string
  svgSource?: string
  onChangeText?: any
  hasError?: boolean,
  changeDirecton?: boolean
}

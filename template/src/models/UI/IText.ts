import { TextProps } from "react-native";

export interface ITextProps extends TextProps {
  showStyle?: boolean;
  noDirectionChange?: boolean;
  children?: any;
  boldFontFamily?: string;
  disabled?: boolean
}

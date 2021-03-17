import { TextProps } from "react-native";

export interface ITextProps extends TextProps {
  showStyle?: boolean;
  children?: any;
  boldFontFamily?: string;
}
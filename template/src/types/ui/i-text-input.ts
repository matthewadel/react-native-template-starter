import { StyleProp, TextInputProps, TextStyle } from 'react-native';

import { ISVGImage } from './i-svg';

export interface ITextInput extends TextInputProps {
  textInputStyle?: StyleProp<TextStyle>;
  noDirectionChange?: boolean;
  hasError?: boolean;
  svgProps?: ISVGImage;
}

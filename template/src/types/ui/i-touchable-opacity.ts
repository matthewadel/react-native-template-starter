import { StyleProp, TextStyle, TouchableOpacityProps } from 'react-native';

import { IText } from '@/types';

export interface ITouchableOpacity extends TouchableOpacityProps {
  noDirectionChange?: boolean;
  ActivityIndicatorColor?: string;
  showStyle?: boolean;
  loading?: boolean;
  dontClosekeyboard?: boolean;
  textStyle?: StyleProp<TextStyle>;
  textProps?: IText;
}

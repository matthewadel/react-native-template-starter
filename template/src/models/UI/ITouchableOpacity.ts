import { ITextProps } from 'models';
import {
  TextStyle,
  TouchableOpacityProps,
  GestureResponderEvent,
  ViewStyle,
} from 'react-native';

export interface ITouchableOpacity extends TouchableOpacityProps, ITextProps {
  onPress?: any;
  children?: any;
  noDirectionChange?: boolean;
  ActivityIndicatorColor?: string;
  showStyle?: boolean;
  disabled?: boolean;
  loading?: boolean;
  textStyle?: TextStyle | TextStyle[];
  activeOpacity?: number;
  boldFontFamily?: string;
  positionAbsoluteButton?: boolean;
  dontClosekeyboard?: boolean;
  textProps?: ITextProps;
  style?: ViewStyle | ViewStyle[];
  onLongPress?:
  | (((event: GestureResponderEvent) => void) & (() => void))
  | undefined;
  onPressIn?:
  | (((event: GestureResponderEvent) => void) & (() => void))
  | undefined;
  onPressOut?:
  | (((event: GestureResponderEvent) => void) & (() => void))
  | undefined;
}
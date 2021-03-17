import { ITextProps } from 'models';
import {
  TextStyle,
  TouchableOpacityProps,
  GestureResponderEvent,
  ViewStyle,
} from 'react-native';

export interface ITouchableOpacityProps extends TouchableOpacityProps, ITextProps {
  logEvent?: { eventName: string; eventParams: {} };
  onPress?: any;
  children?: any;
  noDirectionChange?: boolean;
  showStyle?: boolean;
  disabled?: boolean;
  textStyle?: TextStyle | TextStyle[];
  activeOpacity?: number;
  boldFontFamily?: string;
  positionAbsoluteButton?: boolean;
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
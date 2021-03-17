import { TextStyle, ViewProps, ViewStyle } from 'react-native';

export interface IView extends ViewProps {
  noDirectionChange?: boolean;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  showStyle?: boolean;
  noTextDirectionChange?: boolean;
  children?: any;
}

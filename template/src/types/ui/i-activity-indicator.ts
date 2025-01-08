import { StyleProp, ViewStyle } from 'react-native';

export interface IActivityIndicator {
  size?: 'small' | 'large';
  color?: string;
  style?: StyleProp<ViewStyle>;
}

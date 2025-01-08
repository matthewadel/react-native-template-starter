import { ViewStyle } from 'react-native';

import { ITouchableOpacity } from '@/types';

export interface IVectorIcons extends ITouchableOpacity {
  icon: string;
  name: string;
  size?: number;
  color?: string;
  iconStyle?: ViewStyle | ViewStyle[];
  children?: JSX.Element | JSX.Element[] | string | string[];
  noIconDirectionChange?: boolean;
  loading?: boolean;
}

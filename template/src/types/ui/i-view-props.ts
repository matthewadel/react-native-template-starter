import type { ViewProps } from 'react-native';

export interface iView extends ViewProps {
  noDirectionChange?: boolean;
  showStyle?: boolean;
}

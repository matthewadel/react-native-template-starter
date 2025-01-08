import { ImageProps } from 'react-native';

import { ITouchableOpacity } from '@/types';

export interface IImage extends ImageProps, ITouchableOpacity {
  style?: any;
  hideLoader?: boolean;
  noDirectionChange?: boolean;
  showStyle?: boolean;
  openImage?: boolean;
  onLayout?: any;
  source: any;
  imageUrls?: { url: string }[];
  index?: number;
}

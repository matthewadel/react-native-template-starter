import { ITouchableOpacity } from './i-touchable-opacity';

export interface ISVGImage extends ITouchableOpacity {
  source: string;
  preserveAspectRatio?: string;
  height?: number | string;
  width?: number | string;
}

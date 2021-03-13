import {store} from 'store';
import {Dimensions} from 'react-native';

export * from './ActivityIndicator';
export * from './Button';
export * from './ChangeDirectionStyle';
export * from './Colors';
export * from './ConvertStyleToObject';
export * from './DatePicker';
export * from './Image';
export * from './ImagePicker';
export * from './Modal';
export * from './ScreenContainer';
export * from './ScreenContainer/ScreenHeader';
export * from './ScrollView';
export * from './SVGImage';
export * from './Swiper';
export * from './Text';
export * from './TextInput';
export * from './TouchableOpacity';
export * from './VectorIcons';
export * from './View';

export const FONT_FAMILY = () =>
  store.getState().App.lang == 'ar' ? 'Cairo-SemiBold' : 'Poppins-Regular';
export const WIDTH = () => Dimensions.get('window').width;
export const HEIGHT = () => Dimensions.get('window').height;

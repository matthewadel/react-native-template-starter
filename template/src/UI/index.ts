import { store } from 'store';
import { Dimensions } from 'react-native';
import { RFValue as RNRFValue } from 'react-native-responsive-fontsize';

export * from './ActivityIndicator';
export * from './Button';
export * from './ChangeDirectionStyle';
export * from './CheckBox';
export * from './Colors';
export * from './ConvertStyleToObject';
export * from './DatePicker';
export * from './FlashMsg';
export * from './Image';
export * from './ImagePicker';
export * from './Modal';

export * from './ScreenContainer';
export * from './ScreenContainer/ScreenHeader';
export * from './ScreenContainer/AnimatedDrawer';
export * from './ScreenContainer/DrawerContent';

export * from './ScrollView';
export * from './SVGImage';
export * from './Swiper';
export * from './Text';
export * from './TextInput';
export * from './TouchableOpacity';
export * from './VectorIcons';
export * from './View';
export const RFValue = (x: number) => RNRFValue(x, 818)
export const FONT_FAMILY = () =>
  store.getState().App.lang == 'ar' ? 'Cairo-SemiBold' : 'Poppins-Regular';
export const WIDTH = () => Dimensions.get('window').width;
export const HEIGHT = () => Dimensions.get('window').height;

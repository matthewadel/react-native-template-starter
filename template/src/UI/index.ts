import { Dimensions } from 'react-native';
function RNRFValue(fontSize: number, deviceHeight: number) {
  const { height, width } = Dimensions.get("window");
  const standardLength = width > height ? width : height;

  const heightPercent = (fontSize * standardLength) / deviceHeight;
  return Math.round(heightPercent);
}

export * from './Loading/ActivityIndicator';
export * from './Loading/LoadingScreen';
export * from './ChangeDirectionStyle';
export * from './Button';
export * from './AnimatableView';
export * from './CheckBox';
export * from './Colors';
export * from './ConvertStyleToObject';
export * from './DatePicker';
export * from './FlashMsg';
export * from './FlatList';
export * from './Fonts';
export * from './Image';
export * from './ImagePicker';
export * from './Modal';
export * from './NoData';

export * from './ScreenContainer/ScreenContainer';
export * from './ScreenContainer/ScreenHeader';
export * from './NetworkDisconnected';

export * from './ScrollView';
export * from './Shadow';
export * from './SVGImage';
export * from './Swiper';
export * from './Text';
export * from './TextInput';
export * from './TouchableOpacity';
export * from './VectorIcons';
export * from './View';
export const RFValue = (x: number) => RNRFValue(x, 896)
export const WIDTH = () => Dimensions.get('window').width;
export const HEIGHT = () => Dimensions.get('window').height;
export const PADDING_HORIZONTAL = RFValue(16)
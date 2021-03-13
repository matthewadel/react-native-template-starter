import { store } from 'store'
import { Dimensions } from 'react-native'

import ActivityIndicator from './ActivityIndicator'
import ChangeDirectionStyle from './ChangeDirectionStyle'
import { Colors } from './Colors'
import ConvertStyleToObject from './ConvertStyleToObject'
import DatePicker from './DatePicker'
import Image from './Image'
import ImagePicker from './ImagePicker'
import Modal from './Modal'
import ScreenContainer from './ScreenContainer'
import ScreenHeader from './ScreenContainer/ScreenHeader'
import ScrollView from './ScrollView'
import SVGImage from './SVGImage'
import Swiper from './Swiper'
import Text from './Text'
import TextInput from './TextInput'
import TouchableOpacity from './TouchableOpacity'
import VectorIcons from './VectorIcons'
import View from './View'

const FONT_FAMILY = () => store.getState().App.lang == 'ar' ? 'Cairo-SemiBold' : 'Poppins-Regular'
const WIDTH = () => Dimensions.get('window').width
const HEIGHT = () => Dimensions.get('window').height

export {
  View,
  ActivityIndicator,
  ChangeDirectionStyle,
  ConvertStyleToObject,
  Text,
  FONT_FAMILY,
  WIDTH,
  HEIGHT,
  Colors,
  Image,
  ScreenContainer,
  ScreenHeader,
  SVGImage,
  ScrollView,
  ImagePicker,
  TextInput,
  TouchableOpacity,
  VectorIcons,
  Swiper,
  DatePicker,
  Modal,
}
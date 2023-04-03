import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Foundation from 'react-native-vector-icons/Foundation';

import { ConvertStyleToObject, TouchableOpacity, ActivityIndicator } from 'UI';
import { ViewStyle } from 'react-native';
import { useLanguage } from 'lang/useLanguage';
import { ITouchableOpacity } from 'models';

interface VectorIconsProps extends ITouchableOpacity {
  icon: string;
  name: string;
  size?: number;
  color?: string;
  iconStyle?: ViewStyle | ViewStyle[];
  children?: JSX.Element | JSX.Element[] | string | string[];
  noIconDirectionChange?: boolean;
  loading?: boolean;
}

export const VectorIcons = (props: VectorIconsProps) => {
  let components: any = {
    AntDesign,
    Ionicons,
    Entypo,
    Feather,
    FontAwesome,
    MaterialCommunityIcons,
    EvilIcons,
    Octicons,
    FontAwesome5,
    Fontisto,
    MaterialIcons,
    SimpleLineIcons,
    Foundation,
  };

  let {
    icon,
    name,
    size,
    color,
    iconStyle,
    children,
    onPress,
    style,
    noIconDirectionChange,
    loading,
  } = props;

  let Icon = components[icon];
  let iconName = '';

  const { locale } = useLanguage()

  if ((locale === 'ar') && !noIconDirectionChange) {
    if (name.includes('right')) {
      iconName = name.replace('right', 'left');
    } else if (name.includes('left')) {
      iconName = name.replace('left', 'right');
    } else iconName = name;
  } else iconName = name;

  return (
    <TouchableOpacity
      activeOpacity={props.activeOpacity || !!onPress ? 0 : 1}
      {...props}
      style={[
        { padding: 0, justifyContent: 'center', alignItems: 'center' },
        ConvertStyleToObject(style),
      ]}>
      {!loading && (
        <Icon name={iconName} size={size} color={color} style={iconStyle} />
      )}
      {!!loading && (
        <ActivityIndicator size="large" style={{ position: 'absolute' }} />
      )}

      {children}
    </TouchableOpacity>
  );
};

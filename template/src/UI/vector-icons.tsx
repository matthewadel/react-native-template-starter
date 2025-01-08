import React from 'react';
import { StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { getCurrentLanguage } from '@/translation';
import { IVectorIcons } from '@/types';
import { ActivityIndicator, Colors, TouchableOpacity, View } from '@/ui';

export const VectorIcons = (props: IVectorIcons) => {
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
    style,
    noIconDirectionChange,
    loading,
  } = props;

  let Icon = components[icon];
  let iconName = '';

  if (getCurrentLanguage() === 'ar' && !noIconDirectionChange) {
    if (name.includes('right')) {
      iconName = name.replace('right', 'left');
    } else if (name.includes('left')) {
      iconName = name.replace('left', 'right');
    } else iconName = name;
  } else iconName = name;

  let TopComponent = props.onPress ? TouchableOpacity : View;
  return (
    <TopComponent
      {...props}
      style={[styles.container, StyleSheet.flatten(style)]}
    >
      {!loading && (
        <Icon
          name={iconName}
          size={size}
          color={color || Colors().App.Dark}
          style={iconStyle}
        />
      )}
      {!!loading && <ActivityIndicator size="large" style={styles.iconStyle} />}

      {children}
    </TopComponent>
  );
};

const styles = StyleSheet.create({
  container: { padding: 0, justifyContent: 'center', alignItems: 'center' },
  iconStyle: { position: 'absolute' },
});

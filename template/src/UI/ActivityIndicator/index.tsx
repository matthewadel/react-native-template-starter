import React from 'react';
import {
  ActivityIndicator as RNActivityIndicator,
  View,
  ViewStyle,
} from 'react-native';
import { Colors } from 'UI';

interface ActivityIndicatorProps {
  size?: 'small' | 'large';
  color?: string;
  style?: ViewStyle | ViewStyle[];
}

const ActivityIndicator = (props: ActivityIndicatorProps) => {
  let { size, color, style } = props;

  return (
    <View
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        },
        style,
      ]}>
      <RNActivityIndicator
        size={size || 'small'}
        color={color || Colors().White}
      />
    </View>
  );
};

export default ActivityIndicator;

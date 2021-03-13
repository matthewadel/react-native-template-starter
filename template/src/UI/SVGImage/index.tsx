import React from 'react';
import { ViewStyle } from 'react-native';
import { ConvertStyleToObject, TouchableOpacity } from 'UI';
import { ITouchableOpacityProps } from 'UI/TouchableOpacity';

interface SVGImageInterface extends ITouchableOpacityProps {
  source: string;
  height?: number | string;
  width?: number | string;
  style?: ViewStyle | ViewStyle[];
}

export const SVGImage = (props: SVGImageInterface) => {
  let RNSvgImage = props.source;

  return (
    // <View />
    <TouchableOpacity
      disabled={!props.onPress}
      {...props}
      style={[
        { justifyContent: 'center', alignItems: 'center' },
        ConvertStyleToObject(props.style),
      ]}>
      <RNSvgImage
        height={props.height || '100%'}
        width={props.width || '100%'}
      />
    </TouchableOpacity>
  );
};

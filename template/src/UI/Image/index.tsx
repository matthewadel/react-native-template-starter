import React from 'react';
import { Image as RNImage, ImageProps } from 'react-native';
import { ImageStyle } from 'react-native';
import { ChangeDirectionStyle, ConvertStyleToObject, TouchableOpacity } from 'UI';
import { ITouchableOpacityProps } from 'models';

interface imageProps extends ImageProps, ITouchableOpacityProps {
  style?: ImageStyle | ImageStyle[];
  noDirectionChange?: boolean;
  showStyle?: boolean;
  onLayout?: any
}

const Image = (props: imageProps) => {
  return (
    <TouchableOpacity
      disabled={!props.onPress}
      {...props}
      style={[
        { justifyContent: 'center', alignItems: 'center', opacity: 1 },
        ConvertStyleToObject(props.style),
      ]}>
      <RNImage
        {...props}
        children={null}
        style={[{ width: '100%', height: '100%', resizeMode: 'cover' }, ChangeDirectionStyle(props.style, props.noDirectionChange, props.showStyle)]}
      />
      {props.children}
    </TouchableOpacity>
  );
};

export { Image };

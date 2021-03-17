import React from 'react';
import { Image as RNImage, ImageProps } from 'react-native';
import { ImageStyle } from 'react-native';
import { ConvertStyleToObject, ChangeDirectionStyle } from 'UI';

interface imageProps extends ImageProps {
  style?: ImageStyle | ImageStyle[];
  noDirectionChange?: boolean;
  showStyle?: boolean;
}

const Image = (props: imageProps) => {
  return (
    <RNImage
      {...props}
      style={[
        { width: '100%', height: '100%', resizeMode: 'cover' },
        props.noDirectionChange
          ? ConvertStyleToObject(props.style)
          : ChangeDirectionStyle(props.style, props.showStyle),
      ]}
    />
  );
};

export default Image;

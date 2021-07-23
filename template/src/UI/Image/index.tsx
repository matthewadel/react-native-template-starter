import React from 'react';
import { Image as RNImage, ImageProps } from 'react-native';
import { ChangeDirectionStyle, ConvertStyleToObject, TouchableOpacity } from 'UI';
import { ITouchableOpacity } from 'models';
import FastImage from 'react-native-fast-image'

interface imageProps extends ImageProps, ITouchableOpacity {
  style?: any;
  imageStyle?: any;
  onLoad?: any
  onError?: any
  noDirectionChange?: boolean;
  showStyle?: boolean;
  onLayout?: any
  source: any
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
      {props.source.uri ?
        <FastImage
          style={[{ width: '100%', height: '100%' }, props.imageStyle]}
          resizeMode={ConvertStyleToObject(props.style).resizeMode ? FastImage.resizeMode[ConvertStyleToObject(props.style).resizeMode] : FastImage.resizeMode.cover}
          source={{ ...props.source, priority: FastImage.priority.normal, cache: FastImage.cacheControl.immutable }}
        />
        :
        <>
          <RNImage
            {...props}
            children={null}
            style={[
              { resizeMode: 'cover', width: '100%', height: '100%' }, ChangeDirectionStyle(props.style, props.noDirectionChange, props.showStyle),
            ]}
          />
          {props.children}
        </>}
    </TouchableOpacity>
  );
};

export { Image };

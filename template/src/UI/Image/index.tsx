import React from 'react';
import { Image as RNImage, ImageProps } from 'react-native';
import { ChangeDirectionStyle, ConvertStyleToObject, TouchableOpacity } from 'UI';
import { ITouchableOpacity } from 'models';
import { SvgUri } from 'react-native-svg';
import FastImage from 'react-native-fast-image'

interface imageProps extends ImageProps, ITouchableOpacity {
  style?: any;
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
      style={[{ opacity: 1 }, ChangeDirectionStyle(props.style, props.noDirectionChange)]}>
      {props.source.uri?.endsWith(".svg") ?
        <SvgUri
          width={props.style?.width}
          height={props.style?.height}
          style={props.style}
          uri={props.source.uri}
        />
        :
        props.source.uri ?
        <FastImage
          style={[{ width: '100%', height: '100%' },]}
          resizeMode={ConvertStyleToObject(props.style).resizeMode ? FastImage.resizeMode[ConvertStyleToObject(props.style).resizeMode] : FastImage.resizeMode.cover}
          source={{ ...props.source, priority: FastImage.priority.normal, cache: FastImage.cacheControl.immutable }}
        >
          {props.children}
        </FastImage>
        :
        <>
          <RNImage
            {...props}
            children={null}
            style={{ resizeMode: ConvertStyleToObject(props.style).resizeMode ? ConvertStyleToObject(props.style).resizeMode : 'cover', width: '100%', height: '100%', position: 'absolute', zIndex: -200 }}
          />
          {props.children}
        </>}
    </TouchableOpacity>
  );
};

export { Image };

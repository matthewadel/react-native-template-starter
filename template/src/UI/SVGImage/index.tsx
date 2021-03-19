import React from 'react';
import { ConvertStyleToObject, TouchableOpacity } from 'UI';
import { ITouchableOpacityProps } from 'models';

interface SVGImageInterface extends ITouchableOpacityProps {
  source: string;
  height?: number | string;
  width?: number | string;
}

export const SVGImage = (props: SVGImageInterface) => {
  let RNSvgImage = props.source;

  return (
    // <View />
    <TouchableOpacity
      disabled={!props.onPress}
      {...props}
      style={[
        { justifyContent: 'center', alignItems: 'center', opacity: 1 },
        ConvertStyleToObject(props.style),
      ]}>
      <RNSvgImage
        fill='#000'
        height={props.height || '100%'}
        width={props.width || '100%'}
      />
    </TouchableOpacity>
  );
};

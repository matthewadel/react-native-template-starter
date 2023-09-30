import React from 'react';
import { ConvertStyleToObject, TouchableOpacity, View } from 'UI';
import { ITouchableOpacity } from 'models';

interface SVGImageInterface extends ITouchableOpacity {
  source: string;
  preserveAspectRatio?: string;
  height?: number | string;
  width?: number | string;
}

export const SVGImage = (props: SVGImageInterface) => {
  let RNSvgImage: any = props.source;
  let TopComponent: any = props.onPress ? TouchableOpacity : View

  return (
    // <View />
    <TopComponent
      {...props}
      style={[
        { justifyContent: 'center', alignItems: 'center', opacity: 1 },
        ConvertStyleToObject(props.style),
      ]}>
      <RNSvgImage
        fill='#000'
        preserveAspectRatio={props.preserveAspectRatio || "xMinYMin meet"}
        height={props.height || '100%'}
        width={props.width || '100%'}
      />
    </TopComponent>
  );
};

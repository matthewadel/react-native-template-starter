import React from 'react';
import { StyleSheet } from 'react-native';

import { ISVGImage } from '@/types';
import { TouchableOpacity, View } from '@/ui';

export const SVGImage = (props: ISVGImage) => {
  let RNSvgImage: any = props.source;
  let TopComponent: any = props.onPress ? TouchableOpacity : View;

  return (
    // <View />
    <TopComponent
      {...props}
      style={[styles.containerStyle, StyleSheet.flatten(props.style)]}
    >
      <RNSvgImage
        fill="#000"
        preserveAspectRatio={props.preserveAspectRatio || 'xMinYMin meet'}
        height={props.height || '100%'}
        width={props.width || '100%'}
      />
    </TopComponent>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
});

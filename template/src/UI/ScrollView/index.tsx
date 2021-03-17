import React from 'react';
import { ScrollView as RNScrollView, ScrollViewProps } from 'react-native';
import { ChangeDirectionStyle, ConvertStyleToObject } from 'UI';

interface IScrollViewProps extends ScrollViewProps {
  children?: any;
  noDirectionChange?: boolean;
}
export const ScrollView = React.forwardRef(
  (props: IScrollViewProps, ref: any) => (
    <RNScrollView
      ref={ref}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      alwaysBounceVertical={false}
      alwaysBounceHorizontal={false}
      {...props}
      style={{
        width: '100%',
        flexGrow: 0,
        height: '100%',
        ...ConvertStyleToObject(props.style),
      }}
      contentContainerStyle={[
        { width: '100%', flexGrow: 1, alignItems: 'center', alignSelf: 'center' },
        !props.horizontal
          ? {
            width: '100%',
            flexGrow: props.horizontal ? 0 : 1,
            alignItems: 'center',
            alignSelf: 'center',
          }
          : {},
        props.noDirectionChange
          ? ConvertStyleToObject(props.contentContainerStyle)
          : ChangeDirectionStyle(props.contentContainerStyle),
      ]}>
      {props.children}
    </RNScrollView>
  ),
);

import React, { useState } from 'react';
import { Keyboard, TouchableOpacity as RNTouchableOpacity } from 'react-native';

import { ITouchableOpacity } from '@/types';
import { ActivityIndicator, ChangeDirectionStyle, Colors, Text } from '@/ui';

const TouchableOpacity = React.forwardRef(
  (props: ITouchableOpacity, ref: any) => {
    let { children, noDirectionChange, style, showStyle, disabled } = props;

    let [Width, setWidth] = useState(0);
    let [Height, setHeight] = useState(0);

    const onLayout = (event: {
      nativeEvent: { layout: { width: number; height: number } };
    }) => {
      const { height, width } = event.nativeEvent.layout;
      setWidth(width);
      setHeight(height);
    };

    const dynamicOpacity = { opacity: disabled ? 0.5 : 1 };

    return (
      <RNTouchableOpacity
        onLayout={(event) => onLayout(event)}
        ref={ref}
        {...props}
        onPress={(pressProps) => {
          !props.dontClosekeyboard && Keyboard.dismiss();
          props.onPress && props.onPress(pressProps);
        }}
        disabled={!props.onPress || !!props.disabled || !!props.loading}
        style={[
          dynamicOpacity,
          ChangeDirectionStyle(style, noDirectionChange, showStyle),
          props.loading ? { width: Width, height: Height } : {},
        ]}
      >
        {props.loading ? (
          <ActivityIndicator
            size="small"
            color={props.ActivityIndicatorColor || Colors().App.White}
          />
        ) : Array.isArray(children) || children?.type ? (
          children
        ) : (
          <Text
            {...props}
            disabled={!props.onPress || props.disabled || props.loading}
            style={props.textStyle}
          >
            {children}
          </Text>
        )}
      </RNTouchableOpacity>
    );
  },
);
export { TouchableOpacity };

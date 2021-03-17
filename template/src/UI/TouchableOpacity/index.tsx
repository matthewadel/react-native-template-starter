import React from 'react';
import { TouchableOpacity as RNTouchableOpacity, } from 'react-native';
import { ConvertStyleToObject, Text, ChangeDirectionStyle } from 'UI';
import { TouchableOpacity as PositionAbsoluteButton } from 'react-native-gesture-handler';
import { ITouchableOpacityProps } from 'models';


export const TouchableOpacity = (props: ITouchableOpacityProps) => {
  let { children, noDirectionChange, style, showStyle, disabled } = props;

  let Touchable = props.positionAbsoluteButton ? PositionAbsoluteButton : RNTouchableOpacity;

  return (
    <Touchable
      disabled={!props.onPress}
      {...props}
      containerStyle={[
        noDirectionChange
          ? ConvertStyleToObject(style)
          : ChangeDirectionStyle(style, showStyle),
        ,
        {
          width: ConvertStyleToObject(props?.style)?.width,
          marginBottom: 0,
          marginTop: 0,
        },
      ]}
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          opacity: ConvertStyleToObject(style)?.opacity || disabled ? 0.5 : 1,
        },
        noDirectionChange
          ? ConvertStyleToObject(style)
          : ChangeDirectionStyle(style, showStyle),
      ]}>
      {Array.isArray(children) || children?.type ? (
        children
      ) : (
        <Text {...props} style={props.textStyle}>
          {children}
        </Text>
      )}
    </Touchable>
  );
};


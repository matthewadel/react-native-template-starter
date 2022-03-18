import React, { useState } from 'react';
import { TouchableOpacity as RNTouchableOpacity } from 'react-native';
import { ConvertStyleToObject, Text, ChangeDirectionStyle, ActivityIndicator } from 'UI';
import { TouchableOpacity as PositionAbsoluteButton } from 'react-native-gesture-handler'
import { ITouchableOpacity } from 'models';


const TouchableOpacity = React.forwardRef((props: ITouchableOpacity, ref: any) => {
  let {
    children,
    noDirectionChange,
    style,
    showStyle,
    disabled,
  } = props;

  let Touchable = props.positionAbsoluteButton ? PositionAbsoluteButton : RNTouchableOpacity

  let [Width, setWidth] = useState(0)
  let [Height, setHeight] = useState(0)

  const onLayout = (event: { nativeEvent: { layout: { width: number, height: number } } }) => {
    const { height, width } = event.nativeEvent.layout;
    setWidth(width)
    setHeight(height)
  }

  return (
    <Touchable
      onLayout={(event) => onLayout(event)}
      ref={ref}
      {...props}
      disabled={!props.onPress || props.disabled || props.loading}
      containerStyle={[ChangeDirectionStyle(style, noDirectionChange, showStyle), {
        width: ConvertStyleToObject(props?.style)?.width,
        marginBottom: 0, marginTop: 0
      }]}
      style={
        [
          {
            justifyContent: 'center',
            alignItems: 'center',
            opacity: ConvertStyleToObject(style)?.opacity || disabled ? 0.5 : 1,
          },
          ChangeDirectionStyle(style, noDirectionChange, showStyle),
          props.loading ? { width: Width, height: Height, paddingVertical: 0, paddingHorizontal: 0, padding: 0 } : {}
        ]}
    >
      {props.loading ?
        <ActivityIndicator size='small' />
        :
        (Array.isArray(children) || children?.type) ?
          children
          :
          <Text {...props} disabled={!props.onPress || props.disabled || props.loading} style={props.textStyle}>{children}</Text>}
    </Touchable>
  );
})
export { TouchableOpacity }

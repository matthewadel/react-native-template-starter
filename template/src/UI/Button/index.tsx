import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Colors,
  TouchableOpacity,
  ConvertStyleToObject,
  ActivityIndicator,
} from 'UI';
import { ITouchableOpacityProps } from 'models';

export interface IButtonProps extends ITouchableOpacityProps {
  loading?: boolean;
  type?: 'PRIMARY' | 'SECONDARY';
}

export const Button = (props: IButtonProps) => {
  let { children, onPress, style, textStyle, loading, disabled } = props;

  let [Width, setWidth] = useState(0);
  let [Height, setHeight] = useState(0);

  const onLayout = (event: any) => {
    const { height, width } = event.nativeEvent.layout;
    setWidth(width);
    setHeight(height);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading || disabled}
      textStyle={[
        {
          color:
            props.type == 'SECONDARY'
              ? Colors().Button.Secondary.Text
              : Colors().Button.Primary.Text,
          fontWeight: 'bold',
        },
        ConvertStyleToObject(textStyle),
      ]}
      onLayout={(event: any) => onLayout(event)}
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor:
            props.type == 'SECONDARY'
              ? Colors().Button.Secondary.Background
              : Colors().Button.Primary.Background,
          width: '50%',
          borderRadius: RFValue(14),
        },
        disabled
          ? {
            opacity: 0.5,
          }
          : {},
        ConvertStyleToObject(style),
        props.loading
          ? {
            width: Width,
            height: Height,
            paddingVertical: 0,
            paddingHorizontal: 0,
            padding: 0,
          }
          : {},
      ]}>
      {!!loading ? <ActivityIndicator size="small" /> : children}
    </TouchableOpacity>
  );
};

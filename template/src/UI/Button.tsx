import React from 'react';
import {
  RFValue,
  Colors,
  TouchableOpacity,
  ConvertStyleToObject,
  FONT_FAMILY
} from 'UI';
import { ITouchableOpacity } from 'models';

export interface IButtonProps extends ITouchableOpacity {
  loading?: boolean;
  type?: 'PRIMARY' | 'SECONDARY';
}

export const Button = (props: IButtonProps) => {
  let { style, textStyle, disabled } = props;

  return (
    <TouchableOpacity
      {...props}
      textStyle={[
        {
          color:
            props.type == 'SECONDARY'
              ? Colors().App.Secondary
              : Colors().App.Primary,
          fontFamily: FONT_FAMILY("BOLD"),
        },
        ConvertStyleToObject(textStyle),
      ]}
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor:
            props.type == 'SECONDARY'
              ? Colors().App.Secondary
              : Colors().App.Primary,
          width: '50%',
          borderRadius: RFValue(14),
        },
        disabled
          ? {
            opacity: 0.5,
          }
          : {},
        ConvertStyleToObject(style),
      ]} />
  );
};

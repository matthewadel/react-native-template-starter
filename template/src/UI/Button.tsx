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
  let { style, textStyle } = props;

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
          color:
            props.type == 'SECONDARY'
              ? Colors().Text.Primary
              : Colors().App.White,
          backgroundColor:
            props.type == 'SECONDARY'
              ? Colors().App.Secondary
              : Colors().App.Primary,
          borderWidth: props.type == 'SECONDARY' ? 1 : 0,
          width: '100%',
          borderRadius: RFValue(14),
          minHeight: RFValue(50),
          padding: RFValue(14),
        },
        ConvertStyleToObject(style),
      ]} />
  );
};

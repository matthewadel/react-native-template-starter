import { IView } from 'models';
import React from 'react';
import { View as RNView, } from 'react-native';
import { ChangeDirectionStyle, ConvertStyleToObject, Text } from 'UI';


export const View = (props: IView) => {
  let { noDirectionChange, style, showStyle, children, textStyle } = props;

  return (
    <RNView
      {...props}
      style={[
        { justifyContent: 'center', alignItems: 'center' },
        noDirectionChange
          ? ConvertStyleToObject(style)
          : ChangeDirectionStyle(style, showStyle),
      ]}>
      {Array.isArray(children) || children?.type ? (
        children
      ) : !children ? (
        <RNView />
      ) : (
        <Text style={ConvertStyleToObject(textStyle)}>{children}</Text>
      )}
    </RNView>
  );
};

import React from 'react';
import { TextStyle, View as RNView, ViewProps, ViewStyle } from 'react-native';
import { ChangeDirectionStyle, ConvertStyleToObject, Text } from 'UI';

export interface IView extends ViewProps {
  noDirectionChange?: boolean;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  showStyle?: boolean;
  children?: any;
}

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

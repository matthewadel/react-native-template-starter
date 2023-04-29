import { IView } from 'models';
import React from 'react';
import { View as RNView, } from 'react-native';
import { ChangeDirectionStyle, Text } from 'UI';


export const View = (props: IView) => {
  let { noDirectionChange, noTextDirectionChange, style, showStyle, children, textStyle } = props;

  return (
    <RNView
      {...props}
      style={[
        { overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }, ChangeDirectionStyle(style, noDirectionChange, showStyle),
      ]}>
      {Array.isArray(children) || children?.type ? (
        children
      ) : !children ? (
        <RNView />
      ) : (
        <Text style={textStyle} showStyle={showStyle} noDirectionChange={noTextDirectionChange} >{children}</Text>
      )}
    </RNView>
  );
};

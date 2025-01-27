import React from 'react';
import { View as RNView } from 'react-native';

import { iView } from '@/types';
import { ChangeDirectionStyle } from '@/ui';

export const View = (props: iView) => {
  let { noDirectionChange, style, showStyle } = props;

  return (
    <RNView
      {...props}
      style={ChangeDirectionStyle(style || {}, noDirectionChange, showStyle)}
    />
  );
};

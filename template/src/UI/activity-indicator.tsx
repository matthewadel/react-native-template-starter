import React from 'react';
import {
  ActivityIndicator as RNActivityIndicator,
  StyleSheet,
} from 'react-native';

import { IActivityIndicator } from '@/types';
import { Colors, View } from '@/ui';

export const ActivityIndicator = (props: IActivityIndicator) => {
  return (
    <View style={[styles.container, props.style]}>
      <RNActivityIndicator
        size={props.size || 'small'}
        color={props.color || Colors().App.Primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

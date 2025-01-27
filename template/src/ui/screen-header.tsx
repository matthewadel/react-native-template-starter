import React from 'react';
import { StyleSheet } from 'react-native';
import { s } from 'react-native-size-matters';

import { View } from '@/ui';

export const ScreenHeader = () => {
  return <View style={styles.containerStyle} />;
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: s(20),
    width: '100%',
    alignItems: 'flex-start',
  },
});

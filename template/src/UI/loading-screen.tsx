import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/ui';

interface ILoadingScreen {
  style?: any;
}
const LoadingScreen = (props: ILoadingScreen) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      <Text>Loading</Text>
    </View>
  );
};

export { LoadingScreen };

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

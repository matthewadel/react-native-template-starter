import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/ui';

export const NoData = (props: { style?: any; textString?: string }) => {
  const { t } = useTranslation();
  return (
    <View style={[styles.containerStyle, props.style]}>
      <Text numberOfLines={0} style={styles.textStyle}>
        {props.textString || t('UI.noData')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  textStyle: { textAlign: 'center' },
});

import React from 'react';
import { ScreenContainer, Text, TouchableOpacity } from 'UI';

import { RFValue } from 'react-native-responsive-fontsize';
import { useLanguage } from 'lang/useLanguage';

export const Welcome = () => {

  const { t, setLocale } = useLanguage()

  return (
    <ScreenContainer style={{ justifyContent: 'center', }}>
      <Text
        style={{
          marginBottom: RFValue(20),
          fontSize: RFValue(30),
          textAlign: 'center',
        }}
        numberOfLines={0}>
        {t('Welcome.Title')}
      </Text>
      <TouchableOpacity
        onPress={setLocale}
        style={{
          backgroundColor: '#0FF',
          padding: RFValue(20),
          borderRadius: 10,
        }}>
        {t('Welcome.ChangeLanguage')}
      </TouchableOpacity>
    </ScreenContainer>
  );
};

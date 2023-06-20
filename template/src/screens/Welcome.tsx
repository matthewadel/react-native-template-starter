import React from 'react';
import { ScreenContainer, Text, TouchableOpacity, RFValue } from 'UI';
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

      {/* <TextInput style={{ width: '100%', height: RFValue(56), borderWidth: 2 }} /> */}
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

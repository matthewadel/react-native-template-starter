import React from 'react';
import { ScreenContainer, Text, TouchableOpacity, RFValue, TextInput, View } from 'UI';
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
      <View style={{ height: 200 }} />
      <View style={{ height: 200 }} />
      <View style={{ height: 200 }} />
      <View style={{ height: 200 }} />
      <View style={{ height: 200 }} />
      <TextInput style={{ width: '100%', height: RFValue(56), borderWidth: 2 }} />
      <TouchableOpacity
        onPress={setLocale}
        style={{
          backgroundColor: '#0FF',
          padding: RFValue(20),
          borderRadius: 10,
        }}>
        {t('Welcome.ChangeLanguage')}
      </TouchableOpacity>

      <Text>startReactNative</Text>
    </ScreenContainer>
  );
};

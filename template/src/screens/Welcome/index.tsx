import React from 'react';
import { ScreenContainer, Text, TouchableOpacity, RFValue } from 'UI';
import { useLanguage } from 'lang/useLanguage';
import crashlytics from '@react-native-firebase/crashlytics';

export const Welcome = () => {

  const { t, setLocale } = useLanguage()

  return (
    <ScreenContainer style={{ justifyContent: 'center', borderWidth: 2, borderColor: '#f00' }}>
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
        onPress={() => crashlytics().crash()}
        // onPress={setLocale}
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

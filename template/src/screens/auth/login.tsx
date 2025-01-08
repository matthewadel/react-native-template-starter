import React from 'react';
import { useTranslation } from 'react-i18next';

import { getCurrentLanguage, useChangeLanguage } from '@/translation';
import { Text, TouchableOpacity, View } from '@/ui';

const Login = () => {
  const { t } = useTranslation();
  const { toggleLanguage } = useChangeLanguage();

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          toggleLanguage(getCurrentLanguage() === 'ar' ? 'en' : 'ar')
        }
      >
        <Text>change language</Text>
      </TouchableOpacity>

      <Text>{t('Home.Home')}</Text>
      <Text>current langugae is: {getCurrentLanguage()}</Text>
    </View>
  );
};

export { Login };

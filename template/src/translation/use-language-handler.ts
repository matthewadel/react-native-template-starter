// import { useTranslation } from 'react-i18next';
import { setLanguage } from 'react-native-localization-settings';

import { i18n } from '@/translation';

const useChangeLanguage = () => {
  const toggleLanguage = (lang: string) => {
    if (getCurrentLanguage() !== lang) {
      setLanguage(lang);
      i18n.changeLanguage(lang);
      // .then(() => {
      //   checkAppDirection();
      // })
      // .catch((e) => console.log(e));
    }
  };

  return {
    toggleLanguage,
  };
};

const getCurrentLanguage = (lang?: string) =>
  (lang || i18n.language)?.split('-')[0] || 'en';

// const checkAppDirection = () => {
//   // console.log('i18n.language', i18n.language);
//   I18nManager.allowRTL(true);
//   if (getCurrentLanguage() === 'ar' && !I18nManager.isRTL) {
//     I18nManager.forceRTL(true);
//     setTimeout(() => {
//       RNRestart.restart();
//     }, 1000);
//   } else if (getCurrentLanguage() !== 'ar' && I18nManager.isRTL) {
//     I18nManager.forceRTL(false);
//     setTimeout(() => {
//       RNRestart.restart();
//     }, 1000);
//   }
// };

export { getCurrentLanguage, useChangeLanguage };

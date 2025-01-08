import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { createLanguageDetector } from 'react-native-localization-settings';

import { AR, EN } from '@/translation';
// import { checkAppDirection } from '@/ui';

// we've configured the instance of I18n and you must use the same instance
// by importing it from anywher in the app to avoid manipulation many I18n instances
// please make sure that you import useTranstlation hook and imprt t from it
// to listen to changes if he user changes the language from the system
const languageDetector = createLanguageDetector({
  cacheCurrentLanguage: true,
});
const initI18n = () => {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    // .use(AsyncStoragePlugin('en'))
    .use(languageDetector)
    .init({
      resources: {
        en: {
          translation: EN,
        },
        ar: {
          translation: AR,
        },
      },

      interpolation: {
        escapeValue: false,
      },
    });
  // .then(() => {
  //   checkAppDirection();
  // })
  // .catch((e) => console.log(e));
};

export { i18n, initI18n, languageDetector };

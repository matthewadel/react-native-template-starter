import React from "react";
import I18n from "react-native-i18n";

export const useLanguage = () => {

  let x: "ar" | "en" = 'en'
  const LocalizationContext = React.createContext({
    t: (key: string,): string => I18n.t(key),
    setLocale: (x: string): any => x,
    locale: x
  });

  let { t, locale, setLocale } = React.useContext(LocalizationContext);

  return { t, locale, setLocale }
}
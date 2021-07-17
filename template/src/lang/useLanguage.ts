import React from "react";
import LocalizationContext from "./i18n";
import I18n from 'react-native-i18n';
import { SaveLang } from 'store/Actions';
import { useDispatch } from 'react-redux';

export const useLanguage = () => {

  let { t, locale, setLocale } = React.useContext(LocalizationContext);
  const dispatch = useDispatch();

  const changeLanguage = (inputLang?: string) => {
    let lang = inputLang ? inputLang : locale == 'ar' ? 'en' : 'ar';
    I18n.locale = lang;
    dispatch(SaveLang(lang));
    setLocale(lang);
  };


  return { t, locale, setLocale: changeLanguage }
}

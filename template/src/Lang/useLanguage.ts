import React from "react";
import LocalizationContext from "./i18n";

export const useLanguage = () => {

  let { t, locale, setLocale } = React.useContext(LocalizationContext);

  return { t, locale, setLocale }
}
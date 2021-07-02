import React from "react";
import I18n from "react-native-i18n";

I18n.fallbacks = true;
I18n.translations = {
    en: require("./en"),
    ar: require("./ar")
}

export function t(params = '') {
    return I18n.t(params);
}

let x: "ar" | "en" = 'ar'
const LocalizationContext = React.createContext({
    t: (key: string, options?: any): string => key,
    setLocale: (x: string): any => x,
    locale: x
});

export default LocalizationContext;

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

let x: "ar" | "en"
const LocalizationContext = React.createContext({
    t: (key: string,): string => key,
    setLocale: (x: string): any => x,
    locale: x = "en"
});

export default LocalizationContext;
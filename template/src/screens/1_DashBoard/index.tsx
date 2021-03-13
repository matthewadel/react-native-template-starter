import React from 'react'
import { ScreenContainer, Text, TouchableOpacity, } from 'UI'
import LocalizationContext from 'lang/i18n';
import I18n from "react-native-i18n";
import { useDispatch, useSelector } from 'react-redux'
import { SaveLang } from 'store/Actions'
import { IRootState } from 'models'
import { RFValue } from 'react-native-responsive-fontsize';

const DashBoard = () => {

  const changeLanguage = () => {
    let lang = storeData.lang == 'ar' ? 'en' : 'ar'
    I18n.locale = lang;
    dispatch(SaveLang(lang))
    setLocale(lang)
  }

  const storeData = useSelector((state: IRootState) => ({
    lang: state.App.lang,
  }));
  const dispatch = useDispatch()

  const { t, setLocale } = React.useContext(LocalizationContext);
  return (
    <ScreenContainer >

      <Text style={{ marginBottom: RFValue(20) }}>{t('Dashboard.search')}</Text>
      <TouchableOpacity onPress={changeLanguage}>change language</TouchableOpacity>

    </ScreenContainer>
  )
}

export default DashBoard
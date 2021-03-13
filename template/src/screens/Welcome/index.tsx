import React from 'react';
import {ScreenContainer, Text, TouchableOpacity} from 'UI';
import LocalizationContext from 'lang/i18n';
import I18n from 'react-native-i18n';
import {useDispatch, useSelector} from 'react-redux';
import {SaveLang} from 'store/Actions';
import {IRootState} from 'models';
import {RFValue} from 'react-native-responsive-fontsize';

export const Welcome = () => {
  const changeLanguage = () => {
    let lang = storeData.lang == 'ar' ? 'en' : 'ar';
    I18n.locale = lang;
    dispatch(SaveLang(lang));
    setLocale(lang);
  };

  const storeData = useSelector((state: IRootState) => ({
    lang: state.App.lang,
  }));
  const dispatch = useDispatch();

  const {t, setLocale} = React.useContext(LocalizationContext);
  return (
    <ScreenContainer style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text
        style={{
          marginBottom: RFValue(20),
          fontSize: RFValue(30),
          textAlign: 'center',
          padding: RFValue(10),
        }}
        numberOfLines={0}>
        {t('Welcome.Title')}
      </Text>
      <TouchableOpacity
        onPress={changeLanguage}
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

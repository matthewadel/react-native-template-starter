import React from 'react';
import {Text as RNText, Platform, TextProps} from 'react-native';

import {ChangeDirectionStyle, FONT_FAMILY} from 'UI';
import {useSelector} from 'react-redux';
import {IRootState} from 'models';
import {RFValue} from 'react-native-responsive-fontsize';

export interface ITextProps extends TextProps {
  showStyle?: boolean;
  children?: any;
  boldFontFamily?: string;
}

export const Text = (props: ITextProps) => {
  let style = props.style;
  let outputStyle = ChangeDirectionStyle(style, props.showStyle);

  const storeData = useSelector((state: IRootState) => ({
    lang: state.App.lang || 'en',
  }));

  return (
    <RNText
      allowFontScaling={false}
      numberOfLines={
        props.numberOfLines !== undefined ? props.numberOfLines : 1
      }
      {...props}
      style={[
        {
          textAlign: storeData.lang === 'ar' ? 'right' : 'left',
          fontSize: outputStyle?.fontSize || RFValue(16),
          textShadowOffset: {width: 0, height: 0},
          marginVertical: -(outputStyle?.fontSize || RFValue(15)) * 0.35,
          fontFamily: FONT_FAMILY(),
        },
        outputStyle,
        outputStyle && outputStyle.fontWeight === 'bold'
          ? {
              fontFamily: props.boldFontFamily
                ? props.boldFontFamily
                : storeData.lang === 'ar'
                ? `Cairo-Bold`
                : 'Poppins-Bold',
              fontWeight: Platform.OS == 'android' ? 'normal' : 'bold',
            }
          : {},
      ]}></RNText>
  );
};

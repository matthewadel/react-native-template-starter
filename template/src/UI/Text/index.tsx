import React from 'react';
import { Text as RNText, Platform } from 'react-native';
import { useLanguage } from 'lang/useLanguage';
import { ChangeDirectionStyle, FONT_FAMILY } from 'UI';
import { RFValue } from 'react-native-responsive-fontsize';
import { ITextProps } from 'models';

export const Text = (props: ITextProps) => {
  let style = props.style;
  let outputStyle = ChangeDirectionStyle(style, props.showStyle);

  const { locale } = useLanguage()
  return (
    <RNText
      allowFontScaling={false}
      numberOfLines={props.numberOfLines !== undefined ? props.numberOfLines : 1}
      {...props}
      style={[
        {
          textAlign: locale === 'en' ? 'left' : 'right',
          fontSize: outputStyle?.fontSize || RFValue(16),
          textShadowOffset: { width: 0, height: 0 },
          marginVertical: -(outputStyle?.fontSize || RFValue(15)) * (0.35),
          fontFamily: FONT_FAMILY(),
        },
        outputStyle,
        outputStyle && outputStyle.fontWeight === 'bold'
          ? {
            fontFamily: props.boldFontFamily
              ? props.boldFontFamily
              : locale === 'en'
                ? 'Poppins-Bold'
                : `Cairo-Bold`,
            fontWeight: Platform.OS == 'android' ? 'normal' : 'bold',
          }
          : {},
      ]}></RNText>
  );
};

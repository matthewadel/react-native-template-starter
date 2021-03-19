import React, { useState } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps,
  TextStyle,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { RFValue } from 'react-native-responsive-fontsize';
import { useLanguage } from 'lang/useLanguage';
import {
  ChangeDirectionStyle,
  Colors,
  FONT_FAMILY,
  VectorIcons,
  ConvertStyleToObject,
} from 'UI';

interface textInputProps extends TextInputProps {
  textInputStyle?: TextStyle | TextStyle[];
  children?: any;
  togglePasswordButton?: boolean;
  noDirectionChange?: boolean;
  showStyle?: boolean;
  errStyle?: {
    hasError: boolean;
    defaultColor?: string;
  };
  changeDirecton?: boolean;
}

// const TextInput = (props: textInputProps) => {
export const TextInput = React.forwardRef((props: textInputProps, ref: any) => {
  let { style, textInputStyle, errStyle } = props;

  const [showPassword, togglePassword] = useState(false);

  const { locale } = useLanguage()

  return (
    <Animatable.View
      animation={errStyle && errStyle.hasError ? 'shake' : ''}
      style={[
        ChangeDirectionStyle(([{ flexDirection: 'row', alignItems: 'center' }, ConvertStyleToObject(style)]), props.noDirectionChange, props.showStyle),
        errStyle
          ? {
            color: errStyle.hasError
              ? Colors().Text.Error
              : errStyle.defaultColor,
            borderColor: errStyle.hasError
              ? Colors().Text.Error
              : errStyle.defaultColor,
          }
          : {},
      ]}>
      
      {props.children}
      
      <RNTextInput
        ref={ref}
        placeholderTextColor={
          errStyle
            ? errStyle.hasError
              ? Colors().Text.Error
              : errStyle.defaultColor
            : undefined
        }
        secureTextEntry={!!props.togglePasswordButton && !showPassword}
        {...props}
        style={[
          {
            textAlign: locale == 'en' ? 'left' : 'right',
            fontSize: RFValue(16),
            flex: 1,
            height: '100%',
            padding: 0,
            fontFamily: FONT_FAMILY(),
            paddingHorizontal: !!props.togglePasswordButton ? '15%' : 0,
          },
          ChangeDirectionStyle(textInputStyle),
        ]}
      />

      {props.togglePasswordButton && (
        <VectorIcons
          noDirectionChange
          style={{
            width: '15%',
            height: '100%',
            position: 'absolute',
            alignSelf: 'center',
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => togglePassword((prev) => !prev)}
          icon="Feather"
          name={showPassword ? 'eye' : 'eye-off'}
          size={RFValue(18)}
          color={Colors().Text.Dark}
        />
      )}
    </Animatable.View>
  );
});

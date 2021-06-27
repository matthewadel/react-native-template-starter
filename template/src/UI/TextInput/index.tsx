import { ITextInput } from 'models';
import React, { useState } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Animatable from 'react-native-animatable';
import { ChangeDirectionStyle, Colors, ConvertStyleToObject, SVGImage, Text, VectorIcons } from 'UI';
import { useLanguage } from 'lang/useLanguage';

const TextInput = React.forwardRef((props: ITextInput, ref: any) => {
  let { style, textInputStyle, errStyle } = props;

  const [showPassword, togglePassword] = useState(false)
  const { locale } = useLanguage()

  return (
    <>

      {!!props.label && <Text style={[{ marginVertical: RFValue(14), width: '100%' }, props.labelStyle]}>{props.label}</Text>}

      <Animatable.View
        animation={errStyle && errStyle.hasError ? 'shake' : ''}
        style={ChangeDirectionStyle([
          { flexDirection: 'row', alignItems: 'center' },
          ChangeDirectionStyle(style, props.noDirectionChange),
          errStyle ? {
            color: errStyle.hasError ? Colors().Text.Error : errStyle.defaultColor,
            borderColor: errStyle.hasError ? Colors().Text.Error : errStyle.defaultColor,
          } : {},
        ])}>

        {!!props.svgSource && <SVGImage source={props.svgSource} width='70%' height='60%' style={{ borderTopLeftRadius: RFValue(10), borderBottomLeftRadius: RFValue(10), height: '100%', width: RFValue(50), backgroundColor: Colors().App.White }} />}

        <RNTextInput
          ref={ref}
          placeholderTextColor={errStyle ? (errStyle.hasError ? Colors().Text.Error : errStyle.defaultColor) : undefined}
          secureTextEntry={!!props.togglePasswordButton && !showPassword}
          {...props}
          style={[{ textAlign: locale == 'ar' ? 'right' : 'left', fontSize: RFValue(16), flex: 1, height: '100%', paddingVertical: 0, paddingHorizontal: !!props.togglePasswordButton ? '15%' : 0 }, ConvertStyleToObject(textInputStyle),]}
        />

        {props.togglePasswordButton && <VectorIcons noDirectionChange style={{ width: '15%', height: '100%', position: 'absolute', alignSelf: 'center', right: 0, justifyContent: 'center', alignItems: 'center' }} onPress={() => togglePassword(prev => !prev)} icon="Feather" name={showPassword ? "eye" : "eye-off"} size={RFValue(22)} color={Colors().Text.Primary} />}

      </Animatable.View>
    </>
  );
})

export { TextInput };

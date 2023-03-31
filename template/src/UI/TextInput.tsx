import { ITextInput } from 'models';
import React, { useState } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ChangeDirectionStyle, Colors, ConvertStyleToObject, SVGImage, Text, VectorIcons, RFValue } from 'UI';
import { useLanguage } from 'lang/useLanguage';
import { FONT_FAMILY } from 'UI/Fonts';
import { digitsArToEn } from "@persian-tools/persian-tools";

const TextInput = React.forwardRef((props: ITextInput, ref: any) => {

  const [showPassword, togglePassword] = useState(false)
  const { locale } = useLanguage()

  let AnimatableView: any = Animatable.View
  return (
    <>

      {!!props.label && <Text style={[{ marginVertical: RFValue(14), width: '100%' }, props.labelStyle]}>{props.label}</Text>}

      <AnimatableView
        animation={props.hasError ? 'shake' : ''}
        style={ChangeDirectionStyle([
          { flexDirection: 'row', alignItems: 'center' },
          ChangeDirectionStyle(props.style, props.noDirectionChange),
        ])}>

        {!!props.svgSource && <SVGImage source={props.svgSource} width='70%' height='60%' style={{ borderTopLeftRadius: RFValue(10), borderBottomLeftRadius: RFValue(10), height: '100%', width: RFValue(50), backgroundColor: Colors().App.White }} />}

        <RNTextInput
          autoCorrect={false}
          ref={ref}
          placeholderTextColor={props.hasError ? Colors().Text.Error : "#A7A7A7"}
          secureTextEntry={!!props.togglePasswordButton && !showPassword}
          {...props}
          value={props.keyboardType ? digitsArToEn(props.value || "")?.replace(/\D/g, '') : props.value}
          onChangeText={text => props.onChangeText(props.keyboardType ? digitsArToEn(text || "")?.replace(/\D/g, '') : text)}
          style={[{ fontFamily: FONT_FAMILY("LIGHT"), fontSize: RFValue(16), flex: 1, height: '100%', paddingVertical: 0, paddingHorizontal: '5%' },
          props.togglePasswordButton ? { paddingRight: '15%' } : {},
          props.noDirectionChange ? {} : { textAlign: locale == 'ar' ? 'right' : 'left', }, ConvertStyleToObject(props.textInputStyle)]}
        />

        {props.togglePasswordButton && <VectorIcons noDirectionChange style={{ width: '15%', height: '100%', position: 'absolute', alignSelf: 'center', right: 0, justifyContent: 'center', alignItems: 'center' }} dontClosekeyboard onPress={() => togglePassword(prev => !prev)} icon="Feather" name={showPassword ? "eye" : "eye-off"} size={RFValue(22)} color={Colors().Text.Primary} />}

      </AnimatableView>
    </>
  );
})

export { TextInput };

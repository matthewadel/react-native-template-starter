import { ITextInput } from 'models';
import React, { useState } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { ChangeDirectionStyle, Colors, ConvertStyleToObject, SVGImage, Text, VectorIcons, RFValue, AnimatableView } from 'UI';
import { FONT_FAMILY } from 'UI/Fonts';
import { digitsArToEn } from "@persian-tools/persian-tools";

const TextInput = React.forwardRef((props: ITextInput, ref: any) => {

  const [showPassword, togglePassword] = useState(false)
  return (
    <>

      {!!props.label && <Text style={[{ marginVertical: RFValue(14), width: '100%' }, props.labelStyle]}>{props.label}</Text>}

      <AnimatableView
        animation={props.hasError}
        isButtonPressed={props.isButtonPressed}
        style={ChangeDirectionStyle([
          { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: props.hasError ? Colors().App.Red : Colors().App.Secondary, borderRadius: RFValue(8), height: RFValue(50) },
          ConvertStyleToObject(props.style),
        ], props.noDirectionChange)}>

        {!!props.svgSource && <SVGImage source={props.svgSource} width='70%' height='60%' style={{ borderTopLeftRadius: RFValue(10), borderBottomLeftRadius: RFValue(10), height: '100%', width: RFValue(50), backgroundColor: Colors().App.White }} />}

        <RNTextInput
          autoCorrect={false}
          autoCapitalize={props.togglePasswordButton ? 'none' : 'sentences'}
          ref={ref}
          placeholderTextColor={props.hasError ? Colors().Text.Error : "#A7A7A7"}
          secureTextEntry={!!props.togglePasswordButton && !showPassword}
          {...props}
          onChangeText={text => !!props.onChangeText && props.onChangeText(props.keyboardType ? digitsArToEn(text || "")?.replace(/\D/g, '') : text)}
          style={ChangeDirectionStyle([{ color: Colors().App.Dark, textAlign: 'left', fontFamily: FONT_FAMILY("MEDIUM"), fontSize: RFValue(14), flex: 1, paddingVertical: 0, paddingHorizontal: '3%' },
          props.togglePasswordButton ? { paddingRight: '15%', paddingLeft: '3%' } : {},
          ConvertStyleToObject(props.textInputStyle)], props.noDirectionChange)}
        />

        {props.togglePasswordButton && <VectorIcons noDirectionChange style={{ width: '15%', height: '100%', position: 'absolute', alignSelf: 'center', right: 0, justifyContent: 'center', alignItems: 'center' }} dontClosekeyboard onPress={() => togglePassword(prev => !prev)} icon="Feather" name={showPassword ? "eye" : "eye-off"} size={RFValue(22)} color={Colors().Text.Primary} />}

      </AnimatableView>
    </>
  );
})

export { TextInput };

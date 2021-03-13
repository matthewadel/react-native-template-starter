import { IRootState } from 'models';
import React, { useState } from 'react';
import { TextInput as RNTextInput, TextInputProps, TextStyle } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { ChangeDirectionStyle, Colors, ConvertStyleToObject, FONT_FAMILY, VectorIcons } from 'UI';

interface textInputProps extends TextInputProps {
  textInputStyle?: TextStyle | TextStyle[],
  togglePasswordButton?: boolean
  noDirectionChange?: boolean
  errStyle?: {
    hasError: boolean,
    defaultColor?: string
  },
  changeDirecton?: boolean
}

// const TextInput = (props: textInputProps) => {
export default React.forwardRef((props: textInputProps, ref: any) => {
  let { style, textInputStyle, errStyle } = props;

  const [showPassword, togglePassword] = useState(false)

  const storeData = useSelector((state: IRootState) => ({
    lang: state.App.lang || 'en',
  }));

  return (
    <Animatable.View
      animation={errStyle && errStyle.hasError ? 'shake' : ''}
      style={[
        { flexDirection: 'row', alignItems: 'center' },
        props.noDirectionChange ? ConvertStyleToObject(style) : ChangeDirectionStyle(style),
        errStyle ? {
          color: errStyle.hasError ? Colors().Red : errStyle.defaultColor,
          borderColor: errStyle.hasError ? Colors().Red : errStyle.defaultColor,
        } : {},
      ]}>
      <RNTextInput
        ref={ref}
        placeholderTextColor={errStyle ? (errStyle.hasError ? Colors().Red : errStyle.defaultColor) : undefined}
        secureTextEntry={!!props.togglePasswordButton && !showPassword}
        {...props}
        style={[{ textAlign: storeData.lang == 'ar' ? 'right' : 'left', fontSize: RFValue(16), flex: 1, height: '100%', padding: 0, fontFamily: FONT_FAMILY(), paddingHorizontal: !!props.togglePasswordButton ? '15%' : 0 }, ConvertStyleToObject(textInputStyle),]}
      />

      {props.togglePasswordButton && <VectorIcons noDirectionChange style={{ width: '15%', height: '100%', position: 'absolute', alignSelf: 'center', right: 0, justifyContent: 'center', alignItems: 'center' }} onPress={() => togglePassword(prev => !prev)} icon="Feather" name={showPassword ? "eye" : "eye-off"} size={RFValue(18)} color={Colors().Dark} />}

    </Animatable.View>
  );
})
// };

// export default TextInput;
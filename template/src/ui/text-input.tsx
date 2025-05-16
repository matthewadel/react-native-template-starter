import { digitsArToEn } from '@persian-tools/persian-tools';
import React, { useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, TextInput as RNTextInput, Keyboard } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { s, vs } from 'react-native-size-matters';

import { ITextInput } from '@/types';
import {
  ChangeDirectionStyle,
  Colors,
  FONT_FAMILY,
  SVGImage,
  VectorIcons,
  View,
} from '@/ui';

const TextInput = React.forwardRef((props: ITextInput, ref: any) => {
  const [showPassword, togglePassword] = useState(false);
  let AnimatableViewRef = useRef<any>();
  useImperativeHandle(ref, () => ({
    shake: () => AnimatableViewRef.current?.shake(),
  }));

  return (
    <Animatable.View
      animation={'shake'}
      ref={AnimatableViewRef}
      style={ChangeDirectionStyle(
        [
          {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: props.hasError
              ? Colors().App.Red
              : Colors().App.Secondary,
            borderRadius: s(8),
            height: vs(50),
          },
          StyleSheet.flatten(props.style),
        ],
        props.noDirectionChange,
      )}
    >
      {props.svgProps ? (
        <SVGImage {...props.svgProps} />
      ) : (
        <View style={{ marginRight: s(12) }} />
      )}

      <RNTextInput
        allowFontScaling={false}
        onSubmitEditing={() => Keyboard.dismiss()}
        blurOnSubmit={true}
        returnKeyType="done"
        autoCorrect={false}
        autoCapitalize={props.secureTextEntry ? 'none' : 'sentences'}
        ref={ref}
        placeholderTextColor={
          props.hasError
            ? Colors().Text.Error
            : Colors().Text.placeholderTextColor
        }
        {...props}
        secureTextEntry={!!props.secureTextEntry && !showPassword}
        onChangeText={(text) =>
          !!props.onChangeText &&
          props.onChangeText(
            props.keyboardType
              ? digitsArToEn(text || '')?.replace(/\D/g, '')
              : text,
          )
        }
        style={ChangeDirectionStyle(
          [
            {
              color: Colors().App.Dark,
              textAlign: 'left',
              fontFamily: FONT_FAMILY('MEDIUM'),
              fontSize: s(14),
              flex: 1,
              paddingVertical: 0,
              marginRight: s(12),
            },
            props.secureTextEntry
              ? { paddingRight: '15%', paddingLeft: '3%' }
              : {},
            StyleSheet.flatten(props.textInputStyle),
          ],
          props.noDirectionChange,
        )}
      />

      {props.secureTextEntry && (
        <VectorIcons
          noDirectionChange
          style={styles.togglePasswordButtonStyle}
          dontClosekeyboard
          onPress={() => togglePassword((prev) => !prev)}
          icon="Feather"
          name={showPassword ? 'eye' : 'eye-off'}
          size={s(22)}
          color={Colors().Text.Primary}
        />
      )}
    </Animatable.View>
  );
});

export { TextInput };

const styles = StyleSheet.create({
  togglePasswordButtonStyle: {
    width: '15%',
    height: '100%',
    position: 'absolute',
    alignSelf: 'center',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgImageStyle: {
    height: '100%',
    paddingHorizontal: s(12),
    backgroundColor: Colors().App.White,
  },
});

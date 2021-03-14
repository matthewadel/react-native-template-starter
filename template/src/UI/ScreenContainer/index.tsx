import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader, ConvertStyleToObject, ChangeDirectionStyle } from 'UI';
import { IScreenHeader } from './ScreenHeader';

interface IScreenContainer {
  style?: ViewStyle | ViewStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
  children: any;
  headerProps?: IScreenHeader;
  noDirectionChange?: boolean;
}

export const ScreenContainer = (props: IScreenContainer) => {

  const [screenHeight, setScreenHeight] = useState(0)

  const onLayout = (e: { nativeEvent: { layout: { height: number } } }) => {
    if (!screenHeight)
      setScreenHeight(e.nativeEvent.layout.height)
  }

  return (
    <SafeAreaView
      edges={['top']}
      onLayout={onLayout}
      style={[{ height: '100%', }, props.containerStyle]}>

      <ScreenHeader {...props.headerProps} />

      <KeyboardAvoidingView
        style={{ width: '100%', height: screenHeight, }}
        behavior={Platform.OS == 'android' ? 'height' : 'padding'}>

        <ScrollView
          scrollEnabled={true}
          nestedScrollEnabled={true}
          style={{ height: screenHeight, }}
          contentContainerStyle={[
            {
              width: '100%',
              alignItems: 'center',
              alignSelf: 'center',
              height: screenHeight,
            },
            props.noDirectionChange
              ? ConvertStyleToObject(props.style)
              : ChangeDirectionStyle(props.style),
          ]}
          keyboardShouldPersistTaps="handled">
          {props.children}
        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};

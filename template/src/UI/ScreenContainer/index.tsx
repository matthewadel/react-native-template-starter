import React from 'react';
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
  return (
    <SafeAreaView
      edges={['top']}
      style={[{ height: '100%' }, props.containerStyle]}>
      <ScreenHeader {...props.headerProps} />

      <KeyboardAvoidingView
        style={{ width: '100%', flex: 1 }}
        behavior={Platform.OS == 'android' ? 'height' : 'padding'}>
        <ScrollView
          scrollEnabled={true}
          nestedScrollEnabled={true}
          style={{ flexGrow: 1 }}
          contentContainerStyle={[
            {
              width: '100%',
              height: '100%',
              alignItems: 'center',
              alignSelf: 'center',
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

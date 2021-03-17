import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader, ChangeDirectionStyle, AnimatedDrawer, Colors } from 'UI';
import { IScreenHeader } from 'models';
import { TouchableOpacity } from 'UI/TouchableOpacity';
import { RFValue } from 'react-native-responsive-fontsize';

interface IScreenContainer {
  style?: ViewStyle | ViewStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
  children: any;
  headerProps?: IScreenHeader;
  noDirectionChange?: boolean;
  showStyle?: boolean
}

export const ScreenContainer = (props: IScreenContainer) => {

  const [screenHeight, setScreenHeight] = useState(0)
  const [isDrawerOpen, toggleDrawer] = useState(false)
  const AnimatedDrawerRef = useRef<any>()

  const onLayout = (e: { nativeEvent: { layout: { height: number } } }) => {
    if (!screenHeight)
      setScreenHeight(e.nativeEvent.layout.height)
  }

  const openDrawer = () => AnimatedDrawerRef.current.openDrawer()
  const closeDrawer = () => AnimatedDrawerRef.current.closeDrawer()

  return (

    <AnimatedDrawer isDrawerOpen={isDrawerOpen} onDrawerStatusChange={(x: boolean) => toggleDrawer(x)} ref={AnimatedDrawerRef}>

      <KeyboardAvoidingView style={{ width: '100%', flex: 1 }} behavior={Platform.OS == 'android' ? 'height' : 'padding'}>

        <SafeAreaView
          edges={['top']}
          onLayout={onLayout}
          style={[{ height: '100%', backgroundColor: Colors().App.White, }, isDrawerOpen ? { borderWidth: 2, borderColor: Colors().App.Primary, borderRadius: RFValue(25), } : {}, props.containerStyle]}>

          <ScreenHeader {...props.headerProps} />

          <ScrollView
            scrollEnabled={true}
            nestedScrollEnabled={true}
            style={{ flexGrow: 1, }}
            contentContainerStyle={[{ width: '100%', alignItems: 'center', alignSelf: 'center', flexGrow: 1, }, ChangeDirectionStyle(props.style, props.noDirectionChange, props.showStyle)]}
            keyboardShouldPersistTaps='handled'
          >
            <TouchableOpacity onPress={openDrawer}>dddsds</TouchableOpacity>
            {props.children}
          </ScrollView>

        </SafeAreaView>
      </KeyboardAvoidingView >

    </AnimatedDrawer>
  );
};

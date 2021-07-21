import React, { useRef, useState, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader, ChangeDirectionStyle, RFValue, AnimatedDrawer, Colors } from 'UI';
import { IScreenHeader } from 'models';
import { useDispatch } from 'react-redux';
import { SetActualhHeight } from 'store/Actions';
import { store } from 'store';

interface IScreenContainer {
  style?: ViewStyle | ViewStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
  children: any;
  headerProps?: IScreenHeader;
  noDirectionChange?: boolean;
  showStyle?: boolean
  reduceFromScreenHeight?: number
}

export const ScreenContainer = (props: IScreenContainer) => {

const [screenHeight, setScreenHeight] = useState(store.getState().App.actualHeight || '100%')
  const [executionCount, setExecutionCount] = useState(0)
  const [isDrawerOpen, toggleDrawer] = useState(false)
  const AnimatedDrawerRef = useRef<any>()
  const dispatch = useDispatch()

  const onLayout = useCallback((e) => {
    if (executionCount == 0)
      setExecutionCount(1)
    else if (executionCount == 1) {
      setScreenHeight(e.nativeEvent.layout.height)
      dispatch(SetActualhHeight(e.nativeEvent.layout.height))
      setExecutionCount(2)
    }
  }, [executionCount]);

  const openDrawer = () => AnimatedDrawerRef.current.openDrawer()
  const closeDrawer = () => AnimatedDrawerRef.current.closeDrawer()
  return (

    <AnimatedDrawer isDrawerOpen={isDrawerOpen} onDrawerStatusChange={(x: boolean) => toggleDrawer(x)} ref={AnimatedDrawerRef}>

      <KeyboardAvoidingView style={{ width: '100%', flex: 1 }} behavior={Platform.OS == 'android' ? 'height' : 'padding'}>

        <SafeAreaView
          edges={['top']}
          style={[{ height: '100%', }, isDrawerOpen ? { borderWidth: 2, borderColor: Colors().App.Primary, borderRadius: RFValue(25), } : {}, props.containerStyle]}>

          {!!(store.getState().App.actualHeight) && <ScreenHeader {...props.headerProps} />}

          <ScrollView
            onLayout={store.getState().App.actualHeight ? () => null : onLayout}
            scrollEnabled={true}
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={{ flexGrow: 1, }}
            contentContainerStyle={[{ width: '100%', alignItems: 'center', alignSelf: 'center', height: screenHeight - (props.reduceFromScreenHeight || 0), }, ChangeDirectionStyle(props.style, props.noDirectionChange, props.showStyle)]}
            keyboardShouldPersistTaps='handled'
          >
            {props.children}
          </ScrollView>

        </SafeAreaView>
      </KeyboardAvoidingView>

    </AnimatedDrawer>
  );
};

import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  ScrollView,
  StatusBar,
  Keyboard,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeader, ChangeDirectionStyle, RFValue, AnimatedDrawer, Colors, LoadingScreen, WIDTH, HEIGHT, NetworkDisconnected } from 'UI';
import { useSelector } from 'react-redux';
import { IRootState, IScreenHeader } from 'models';
import { useDispatch } from 'react-redux';
import { SetActualhHeight, SetNotchHeight } from 'store/Actions';
import { useFocusEffect } from '@react-navigation/native';
import { useAjaxRequest } from 'API';

interface IScreenContainer {
  style?: ViewStyle | ViewStyle[];
  children: any;
  headerProps?: IScreenHeader;
  outScrollingComponents?: any;
  noDirectionChange?: boolean;
  loading?: boolean;
  overlayLoading?: boolean;
  showStyle?: boolean
  requestIdsInPage?: number[]
}

const ScreenContainer = (props: IScreenContainer) => {

  const [isDrawerOpen, toggleDrawer] = useState(false)
  const AnimatedDrawerRef = useRef<any>()
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { actualHeight } = useSelector((state: IRootState) => ({ actualHeight: state.App.actualHeight }));
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch()
  const { cancelRequest } = useAjaxRequest()

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS == "android" ? 'keyboardDidShow' : 'keyboardWillChangeFrame',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS == "android" ? 'keyboardDidHide' : 'keyboardWillHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (props.requestIdsInPage?.length)
          for (let i = 0; i < props.requestIdsInPage.length; i++)
            cancelRequest(props.requestIdsInPage[i])
      }
    }, []))

  useEffect(() => {

    let statusBarHeight = StatusBar.currentHeight ? 2 * StatusBar.currentHeight : 0
    if (!actualHeight) {
      dispatch(SetActualhHeight(HEIGHT() - (insets.top + statusBarHeight)))
      dispatch(SetNotchHeight({ top: insets.top + statusBarHeight, bottom: 0 }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualHeight])

  const openDrawer = () => AnimatedDrawerRef.current.openDrawer()
  // const closeDrawer = () => AnimatedDrawerRef.current.closeDrawer()

  return (

    <AnimatedDrawer isDrawerOpen={isDrawerOpen} onDrawerStatusChange={(x: boolean) => toggleDrawer(x)} ref={AnimatedDrawerRef}>

      <SafeAreaView
        edges={['top']}
        style={[{ height: '100%', backgroundColor: Colors().App.White }, isDrawerOpen ? { borderWidth: 2, borderColor: Colors().App.Primary, borderRadius: RFValue(25), } : {}]}>

        {props.headerProps && <ScreenHeader openDrawer={openDrawer} {...props.headerProps} />}

        <StatusBar
          animated={true}
          barStyle={'dark-content'}
          backgroundColor='#fff' />

        <KeyboardAvoidingView style={{ width: '100%', flex: 1, }} behavior={Platform.OS == 'android' ? undefined : 'padding'}>

          <NetworkDisconnected />

          {props.loading ?
            <LoadingScreen style={{ flex: 1 }} />
            :
            <ScrollView
              scrollEnabled={true}
              alwaysBounceVertical={false}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              style={{ flexGrow: 1, }}
              contentContainerStyle={[
                { paddingHorizontal: RFValue(16), alignItems: 'center', height: 'auto', flexGrow: 0 },
                ChangeDirectionStyle(props.style, props.noDirectionChange, props.showStyle)
              ]}
              keyboardShouldPersistTaps='handled'
            >
              {props.children}
            </ScrollView>}

          {!isKeyboardVisible && props.outScrollingComponents && props.outScrollingComponents()}

          {!!props.overlayLoading && <LoadingScreen style={{ height: '100%', position: 'absolute', width: WIDTH(), zIndex: 200, backgroundColor: Colors(0.4).App.Grey }} />}

        </KeyboardAvoidingView>
      </SafeAreaView>


    </AnimatedDrawer>
  );
};

export { ScreenContainer }
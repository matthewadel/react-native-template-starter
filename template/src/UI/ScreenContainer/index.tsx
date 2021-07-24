import React, { useRef, useState, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader, ChangeDirectionStyle, RFValue, AnimatedDrawer, Colors } from 'UI';
import { IRootState, IScreenHeader } from 'models';
import { connect, useDispatch } from 'react-redux';
import { SetActualhHeight } from 'store/Actions';

interface IScreenContainer extends IRootState {
  style?: ViewStyle | ViewStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
  children: any;
  headerProps?: IScreenHeader;
  noDirectionChange?: boolean;
  showStyle?: boolean
  reduceFromScreenHeight?: number
}

const ScreenContainerComponent = (props: IScreenContainer) => {

  const [executionCount, setExecutionCount] = useState(0)
  const [isDrawerOpen, toggleDrawer] = useState(false)
  const AnimatedDrawerRef = useRef<any>()
  const dispatch = useDispatch()

  const onLayout = useCallback((e) => {
    if (executionCount == 0)
      setExecutionCount(1)
    else if (executionCount == 1) {
      console.log('native height', e.nativeEvent.layout.height)
      dispatch(SetActualhHeight(e.nativeEvent.layout.height))
      setExecutionCount(2)
    }
  }, [executionCount]);

  const openDrawer = () => AnimatedDrawerRef.current.openDrawer()
  const closeDrawer = () => AnimatedDrawerRef.current.closeDrawer()

  return (

    <AnimatedDrawer isDrawerOpen={isDrawerOpen} onDrawerStatusChange={(x: boolean) => toggleDrawer(x)} ref={AnimatedDrawerRef}>

      <KeyboardAvoidingView style={{ width: '100%', flex: 1, }} behavior={Platform.OS == 'android' ? 'height' : 'padding'}>

        <SafeAreaView
          edges={['top']}
          style={[{ height: '100%', backgroundColor: props.headerProps ? Colors().App.Primary : 'transparent' }, isDrawerOpen ? { borderWidth: 2, borderColor: Colors().App.Primary, borderRadius: RFValue(25), } : {}, props.containerStyle]}>

          {props.headerProps && !!(props.App?.actualHeight) && <ScreenHeader openDrawer={openDrawer} {...props.headerProps} />}

          <ScrollView
            onLayout={props.App?.actualHeight ? () => null : onLayout}
            scrollEnabled={true}
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={{ flexGrow: 1, }}
            contentContainerStyle={[{ width: '100%', alignItems: 'center', alignSelf: 'center', height: ((props.App?.actualHeight || Dimensions.get('window').height) - (props.reduceFromScreenHeight || 0) - (props.headerProps ? RFValue(52) : 0)) }, ChangeDirectionStyle(props.style, props.noDirectionChange, props.showStyle)]}
            keyboardShouldPersistTaps='handled'
          >
            {props.children}
          </ScrollView>

        </SafeAreaView>
      </KeyboardAvoidingView>

    </AnimatedDrawer>
  );
};

const ScreenContainer = connect(({ App }: IRootState) => ({ App }))(ScreenContainerComponent);
export { ScreenContainer }

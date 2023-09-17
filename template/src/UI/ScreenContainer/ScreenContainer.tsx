import React, { useEffect, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  ScrollView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeader, ChangeDirectionStyle, RFValue, Colors, LoadingScreen, WIDTH, HEIGHT, NetworkDisconnected, View, NoData, PADDING_HORIZONTAL } from 'UI';
import { useSelector } from 'react-redux';
import { IRootState, IScreenHeader } from 'models';
import { useDispatch } from 'react-redux';
import { useAjaxRequest } from 'API';
import { useFocusEffect } from '@react-navigation/native';
import { SetActualhHeight, SetNotchHeight } from 'store';

export interface IScreenContainer {
  style?: ViewStyle | ViewStyle[];
  children: any;
  headerProps?: IScreenHeader;
  outScrollingComponents?: any;
  noDirectionChange?: boolean;
  loading?: boolean;
  overlayLoading?: boolean;
  showStyle?: boolean
  viewOnly?: boolean
  requestIdsInPage?: number[]
  noData?: boolean
  NoDataTextString?: string
  refreshing?: boolean
  onRefresh?: (() => void) | undefined
}

const ScreenContainer = (props: IScreenContainer) => {
  const { actualHeight } = useSelector((state: IRootState) => ({ actualHeight: state.App.actualHeight }));
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch()
  const { cancelRequest } = useAjaxRequest()

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (props.requestIdsInPage?.length)
          for (let i = 0; i < props.requestIdsInPage.length; i++)
            cancelRequest(props.requestIdsInPage[i])
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []))

  useEffect(() => {

    let statusBarHeight = StatusBar.currentHeight ? 2 * StatusBar.currentHeight : 0
    if (!actualHeight) {
      dispatch(SetActualhHeight(HEIGHT() - (insets.top + statusBarHeight)))
      dispatch(SetNotchHeight({ top: insets.top + statusBarHeight, bottom: 0 }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualHeight])

  let childrenStyle = [
    { paddingHorizontal: PADDING_HORIZONTAL, alignItems: 'center', height: 'auto', flexGrow: 0 },
    props.noData ? { height: '100%' } : {},
    ChangeDirectionStyle(props.style, props.noDirectionChange, props.showStyle)]

  return (
    <SafeAreaView
      edges={['top']}
      style={[{ height: '100%', backgroundColor: Colors().App.White }]}>

      <ScreenHeader  {...props.headerProps} />

      <StatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor='#fff' />

      <KeyboardAvoidingView style={{ width: '100%', flex: 1, }} behavior={Platform.OS == 'android' ? undefined : 'padding'}>

        <NetworkDisconnected />

        {props.loading ?
          <LoadingScreen style={{ flex: 1 }} />
          :
          props.viewOnly
            ?
            <View style={[{ width: '100%', height: '100%' }, ...childrenStyle]}>
              {props.children}
            </View>
            :
            <ScrollView
              scrollEnabled={true}
              refreshControl={
                <RefreshControl
                  refreshing={props.refreshing || false}
                  onRefresh={props.onRefresh}
                />}
              alwaysBounceVertical={false}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              style={{ flexGrow: 1, }}
              contentContainerStyle={childrenStyle}
              keyboardShouldPersistTaps='handled'
            >
              {props.noData ? <NoData textString={props.NoDataTextString} /> : props.children}
            </ScrollView>}

        {props.outScrollingComponents && <View style={{ paddingHorizontal: PADDING_HORIZONTAL, marginBottom: RFValue(32), marginTop: RFValue(25) }}>
          {props.outScrollingComponents()}
        </View>}

        {!!props.overlayLoading && <LoadingScreen style={{ height: '100%', position: 'absolute', width: WIDTH(), zIndex: 200, backgroundColor: Colors(0.4).App.Grey }} />}

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};

export { ScreenContainer }



// benefits of scrollview
// 1- scroll if there is a keyboard in the screen
// 2- in small mobile phones, if the content exceeded the height of the screen, it will be scrollable and no data will be missed of the screen
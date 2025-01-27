import React, { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { s, vs } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { SetActualhHeight, SetNotchHeight } from '@/store';
import { IRootState, IScreenHeader } from '@/types';
import {
  ChangeDirectionStyle,
  Colors,
  LoadingScreen,
  NetworkDisconnected,
  NoData,
  ScreenHeader,
  View,
} from '@/ui';

export interface IScreenContainer {
  style?: ViewStyle | ViewStyle[];
  children: any;
  headerProps?: IScreenHeader;
  outScrollingComponents?: any;
  noDirectionChange?: boolean;
  loading?: boolean;
  overlayLoading?: boolean;
  showStyle?: boolean;
  viewOnly?: boolean;
  requestIdsInPage?: number[];
  noData?: boolean;
  NoDataTextString?: string;
  refreshing?: boolean;
  onRefresh?: (() => void) | undefined;
}

const ScreenContainer = (props: IScreenContainer) => {
  const { actualHeight } = useSelector((state: IRootState) => ({
    actualHeight: state.App.actualHeight,
  }));
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { height: HEIGHT, width: WIDTH } = useWindowDimensions();

  useEffect(() => {
    let statusBarHeight = StatusBar.currentHeight
      ? 2 * StatusBar.currentHeight
      : 0;
    if (!actualHeight) {
      dispatch(
        SetActualhHeight(
          HEIGHT - (insets.top + statusBarHeight + insets.bottom),
        ),
      );
      dispatch(
        SetNotchHeight({ top: insets.top + statusBarHeight, bottom: 0 }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualHeight]);

  let childrenStyle = [
    {
      paddingHorizontal: s(16),
      alignItems: 'center',
      height: 'auto',
      flexGrow: 0,
    },
    props.noData ? { height: '100%' } : {},
    ChangeDirectionStyle(props.style, props.noDirectionChange, props.showStyle),
  ];

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={[{ height: '100%', backgroundColor: Colors().App.White }]}
    >
      <ScreenHeader {...props.headerProps} />

      <StatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor="#fff"
      />

      <KeyboardAvoidingView
        style={{ width: '100%', flex: 1 }}
        behavior={Platform.OS === 'android' ? undefined : 'padding'}
      >
        <NetworkDisconnected />

        {props.loading ? (
          <LoadingScreen style={{ flex: 1 }} />
        ) : props.viewOnly ? (
          <View style={[{ width: '100%', height: '100%' }, ...childrenStyle]}>
            {props.children}
          </View>
        ) : (
          <ScrollView
            scrollEnabled={true}
            refreshControl={
              props.refreshing ? (
                <RefreshControl
                  refreshing={props.refreshing || false}
                  onRefresh={props.onRefresh}
                />
              ) : undefined
            }
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={{ flexGrow: 1 }}
            contentContainerStyle={childrenStyle}
            keyboardShouldPersistTaps="handled"
          >
            {props.noData ? (
              <NoData textString={props.NoDataTextString} />
            ) : (
              props.children
            )}
          </ScrollView>
        )}

        {props.outScrollingComponents && (
          <View
            style={{
              paddingHorizontal: s(20),
              marginBottom: vs(32),
              marginTop: vs(25),
            }}
          >
            {props.outScrollingComponents()}
          </View>
        )}

        {!!props.overlayLoading && (
          <LoadingScreen
            style={{
              height: '100%',
              position: 'absolute',
              width: WIDTH,
              zIndex: 200,
              backgroundColor: Colors(0.1).App.Dark,
            }}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export { ScreenContainer };

// benefits of scrollview
// 1- scroll if there is a keyboard in the screen
// 2- in small mobile phones, if the content exceeded the height of the screen, it will be scrollable and no data will be missed of the screen

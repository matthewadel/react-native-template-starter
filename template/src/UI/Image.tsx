import React, { useCallback, useEffect, useState } from 'react';
import {
  BackHandler,
  GestureResponderEvent,
  Image as RNImage,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Modal } from 'react-native';
import FastImageComponent from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { s, vs } from 'react-native-size-matters';
import { SvgUri } from 'react-native-svg';

import { store } from '@/store';
import { IImage } from '@/types';
import {
  ActivityIndicator,
  ChangeDirectionStyle,
  Colors,
  TouchableOpacity,
  VectorIcons,
  View,
} from '@/ui';

const Image = (props: IImage) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorIconSize, setErrorIconSize] = useState(0);
  const { height: HEIGHT, width: WIDTH } = useWindowDimensions();

  const normalisedSource = () => {
    const { source } = props;
    const NormalisedSource =
      source && typeof source.uri === 'string' ? source : null;
    return props.source && props.source.uri ? NormalisedSource : source;
  };

  const onPressImage = (args: GestureResponderEvent) => {
    if (props.onPress) props.onPress(args);
    else if (props.openImage) setShowModal(true);
  };

  const onBackPress = useCallback(() => {
    if (showModal) {
      setShowModal(false);
      return true;
    }
    return false;
  }, [showModal]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [onBackPress]);

  useEffect(() => {
    if (props.imageUrls) {
      FastImage.preload(props.imageUrls.map((item) => ({ uri: item.url })));
    } else if (props.source.uri && props.source.uri.startsWith('http')) {
      RNImage.prefetch(props.source.uri);
      FastImage.preload([{ uri: props.source.uri }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLayout = (x: {
    nativeEvent: { layout: { width: number; height: number } };
  }) => {
    let { width, height } = x.nativeEvent.layout;
    if (props.onLayout) props.onLayout(x);
    setErrorIconSize((width < height ? width : height) / 2);
  };

  const renderLoader = () => <ActivityIndicator size="large" />;
  let FastImage: any = FastImageComponent;
  return (
    <>
      {!!props.openImage && (
        <Modal
          onRequestClose={() => setShowModal(false)}
          visible={showModal}
          transparent={true}
        >
          <ImageViewer
            loadingRender={renderLoader}
            renderIndicator={() => <View />}
            renderHeader={() => (
              <SafeAreaView style={styles.safeAreaView} edges={['top']}>
                <VectorIcons
                  noIconDirectionChange
                  style={styles.closeButtonStyle}
                  icon="Feather"
                  name="arrow-left-circle"
                  color={'#fff'}
                  size={s(30)}
                  onPress={() => setShowModal(false)}
                />
              </SafeAreaView>
            )}
            index={props.index || 0}
            imageUrls={
              Platform.OS === 'ios'
                ? props.imageUrls
                  ? props.imageUrls.map((item) => ({
                      ...item,
                      width: WIDTH,
                      height: store.getState().App.actualHeight,
                    }))
                  : [{ url: props.source?.uri, width: WIDTH, height: HEIGHT }]
                : props.imageUrls || [{ url: props.source?.uri }]
            }
            renderImage={
              Platform.OS === 'ios'
                ? (inputImage) => (
                    <View style={styles.imageInsideImageViewerStyle}>
                      <ActivityIndicator
                        size="large"
                        style={styles.activityIndicatorStyle}
                      />
                      <FastImage
                        {...props}
                        style={styles.fillStyle}
                        source={{
                          uri: inputImage.source.uri,
                          priority: FastImage.priority.cacheOnly,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </View>
                  )
                : undefined
            }
            enableSwipeDown={true}
            onSwipeDown={() => setShowModal(false)}
          />
        </Modal>
      )}

      {props.source.uri?.endsWith('.svg') ? (
        <SvgUri
          width={props.style?.width}
          height={props.style?.height}
          style={ChangeDirectionStyle(props.style)}
          uri={props.source.uri}
        />
      ) : props.source.uri && !props.source.uri.startsWith('data') ? (
        <FastImage
          {...props}
          onLayout={onLayout}
          onError={() => (!props.hideLoader ? setError(true) : null)}
          onLoadEnd={() => (!props.hideLoader ? setLoading(false) : null)}
          style={ChangeDirectionStyle(
            props.style,
            props.noDirectionChange,
            props.showStyle,
          )}
          resizeMode={
            StyleSheet.flatten(props.style).resizeMode
              ? FastImage.resizeMode[StyleSheet.flatten(props.style).resizeMode]
              : FastImage.resizeMode.cover
          }
          source={{
            ...normalisedSource(),
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
        >
          <TouchableOpacity
            disabled={props.disabled}
            activeOpacity={1}
            onPress={
              props.onPress || props.openImage
                ? (args) => onPressImage(args)
                : undefined
            }
            style={[
              styles.fillStyle,
              !props.hideLoader && (loading || error) ? styles.imageStyle : {},
            ]}
          >
            {!props.hideLoader && loading ? (
              <ActivityIndicator />
            ) : !props.hideLoader && error ? (
              <VectorIcons
                icon="AntDesign"
                name="exclamationcircle"
                size={errorIconSize}
                color={Colors().App.Red}
              />
            ) : (
              props.children
            )}
          </TouchableOpacity>
        </FastImage>
      ) : (
        <View style={[props.style, props.noDirectionChange, props.showStyle]}>
          <RNImage
            {...props}
            children={null}
            style={{
              resizeMode: StyleSheet.flatten(props.style).resizeMode || 'cover',
              ...styles.fillStyle,
            }}
          />
          <TouchableOpacity
            activeOpacity={1}
            onPress={
              props.onPress || props.openImage
                ? (args) => onPressImage(args)
                : undefined
            }
            style={StyleSheet.absoluteFillObject}
          >
            {props.children}
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export { Image };

const styles = StyleSheet.create({
  safeAreaView: {
    alignItems: 'flex-start',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  closeButtonStyle: { zIndex: 2, marginTop: vs(20) },
  imageInsideImageViewerStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicatorStyle: { position: 'absolute' },
  imageStyle: {
    backgroundColor: Colors().App.Dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fillStyle: { width: '100%', height: '100%' },
});

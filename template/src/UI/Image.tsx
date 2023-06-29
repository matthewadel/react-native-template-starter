import React, { useState, useEffect, useCallback } from 'react'
import { Image as RNImage, ImageProps, BackHandler, Platform } from 'react-native'
import FastImageComponent from 'react-native-fast-image'
import { ChangeDirectionStyle, View, ActivityIndicator, TouchableOpacity, ConvertStyleToObject, RFValue, VectorIcons, Colors, WIDTH, HEIGHT } from 'UI'
import { Modal } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import { SvgUri } from 'react-native-svg';
import { ITouchableOpacity } from 'models';
import { SafeAreaView } from 'react-native-safe-area-context'
import { store } from 'store'

interface imageProps extends ImageProps, ITouchableOpacity {
  style?: any;
  renderLoader?: boolean;
  noDirectionChange?: boolean;
  showStyle?: boolean;
  openImage?: boolean;
  onLayout?: any
  source: any
  imageUrls?: { url: string }[]
  index?: number
}

const Image = (props: imageProps) => {

  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const normalisedSource = () => {
    const { source } = props;
    const NormalisedSource =
      source && typeof source.uri === "string" && !source.uri.split("http")[1]
        ? null
        : source;
    return props.source && props.source.uri
      ? NormalisedSource
      : source;
  };

  const onPressImage = () => {
    if (props.onPress)
      props.onPress()
    else if (props.openImage)
      setShowModal(true)
  }

  const onBackPress = useCallback(() => {

    if (showModal) {
      setShowModal(false)
      return true
    }
    return false

  }, [showModal])

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [onBackPress])

  useEffect(() => {
    if (props.source.uri) {
      RNImage.prefetch(props.source.uri)
      FastImage.preload([{ uri: props.source.uri }])
    }
    if (props.imageUrls) {
      FastImage.preload(props.imageUrls.map(item => ({ uri: item.url })))
    }
  }, [props.source.uri])

  const renderLoader = () => <ActivityIndicator size='large' />
  let FastImage: any = FastImageComponent
  return (
    <>
      {!!props.openImage && <Modal onRequestClose={() => setShowModal(false)} visible={showModal} transparent={true}>
        <ImageViewer
          loadingRender={renderLoader}
          renderIndicator={() => <View />}
          renderHeader={() => (
            <SafeAreaView
              style={{ alignItems: 'flex-start', position: 'absolute', top: 0, zIndex: 1 }}
              edges={['top']}>
              <VectorIcons noIconDirectionChange style={{ zIndex: 2, marginTop: RFValue(20) }} icon="Feather" name="arrow-left-circle" color={'#fff'} size={RFValue(30)} onPress={() => setShowModal(false)} />
            </SafeAreaView>
          )}
          index={props.index || 0}
          imageUrls={Platform.OS == 'ios' ? (props.imageUrls ? props.imageUrls.map(item => ({ ...item, width: WIDTH(), height: store.getState().App.actualHeight })) : [{ url: props.source?.uri, width: WIDTH(), height: HEIGHT() }]) : (props.imageUrls || [{ url: props.source?.uri, }])}
          renderImage={Platform.OS == 'ios' ? (inputImage) => (
            <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size='large' style={{ position: 'absolute' }} />
              <FastImage
                {...props}
                style={{ width: '100%', height: '100%' }}
                source={{
                  uri: inputImage.source.uri,
                  priority: FastImage.priority.cacheOnly,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          ) : undefined}
          enableSwipeDown={true} onSwipeDown={() => setShowModal(false)} />
      </Modal>}

      {props.source.uri?.endsWith(".svg") ?
        <SvgUri
          width={props.style?.width}
          height={props.style?.height}
          style={ChangeDirectionStyle(props.style)}
          uri={props.source.uri}
        />
        :
        props.source.uri && !(props.source.uri.startsWith('data')) ?

          <FastImage
            {...props}
            onError={() => props.renderLoader ? setError(true) : null}
            onLoadEnd={() => props.renderLoader ? setLoading(false) : null}
            style={ChangeDirectionStyle(props.style, props.noDirectionChange, props.showStyle)}
            resizeMode={ConvertStyleToObject(props.style).resizeMode ? FastImage.resizeMode[ConvertStyleToObject(props.style).resizeMode] : FastImage.resizeMode.cover}
            source={{ ...normalisedSource(), priority: FastImage.priority.high, cache: FastImage.cacheControl.immutable }}
          >
            <TouchableOpacity disabled={props.disabled} activeOpacity={1} onPress={(props.onPress || props.openImage) ? onPressImage : null} style={[{ width: '100%', height: '100%', }, props.renderLoader && (loading || error) ? { backgroundColor: Colors().App.Dark, justifyContent: 'center', alignItems: 'center' } : {}]}>
              {(props.renderLoader && loading) ? <ActivityIndicator /> : (props.renderLoader && error) ? <VectorIcons icon="AntDesign" name="exclamationcircle" size={RFValue(30)} color={Colors().App.Red} /> : props.children}
            </TouchableOpacity>
          </FastImage>

          :
          <View style={[props.style, props.noDirectionChange, props.showStyle]}>
            <RNImage {...props} children={null} style={{ resizeMode: ConvertStyleToObject(props.style).resizeMode || 'cover', width: '100%', height: '100%' }} />
            <TouchableOpacity activeOpacity={1} onPress={(props.onPress || props.openImage) ? onPressImage : null} style={{ position: 'absolute', right: 0, left: 0, top: 0, bottom: 0 }} >
              {props.children}
            </TouchableOpacity>
          </View>}

    </>
  )

}


export { Image }

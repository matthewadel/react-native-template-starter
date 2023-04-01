import React, { useState, useEffect } from 'react'
import { Image as RNImage, ImageProps, BackHandler } from 'react-native'
import FastImage from 'react-native-fast-image'
import { ChangeDirectionStyle, View, ActivityIndicator, TouchableOpacity, ConvertStyleToObject, RFValue, VectorIcons, Colors } from 'UI'
import { Modal } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import { SvgUri } from 'react-native-svg';
import { ITouchableOpacity } from 'models';
import { SafeAreaView } from 'react-native-safe-area-context'

interface imageProps extends ImageProps, ITouchableOpacity {
  style?: any;
  renderLoader?: boolean;
  noDirectionChange?: boolean;
  showStyle?: boolean;
  openImage?: boolean;
  onLayout?: any
  source: any
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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [showModal])

  useEffect(() => {
    if (props.source.uri)
      RNImage.prefetch(props.source.uri)
  }, [])


  const onBackPress = () => {

    if (showModal) {
      setShowModal(false)
      return true
    }
    return false

  }

  return (
    <>
      {!!props.openImage && <Modal onRequestClose={() => setShowModal(false)} visible={showModal} transparent={true}>
        <ImageViewer
          loadingRender={() => <ActivityIndicator size='large' />}
          renderIndicator={() => <View />}
          renderHeader={() => (
            <SafeAreaView
              style={{ alignItems: 'flex-start', position: 'absolute', top: 0, zIndex: 1 }}
              edges={['top']}>
              <VectorIcons noIconDirectionChange style={{ zIndex: 2, marginTop: RFValue(20) }} icon="Feather" name="arrow-left-circle" color={'#fff'} size={RFValue(30)} onPress={() => setShowModal(false)} />
            </SafeAreaView>
          )}
          index={0} enableSwipeDown={true} onSwipeDown={() => setShowModal(false)} imageUrls={[{ url: props.source?.uri }]} />
      </Modal>}

      {props.source.uri?.endsWith(".svg") ?
        <SvgUri
          width={props.style?.width}
          height={props.style?.height}
          style={props.style}
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
            source={{ ...normalisedSource(), priority: FastImage.priority.normal, cache: FastImage.cacheControl.immutable }}
          >
            <TouchableOpacity disabled={props.disabled} activeOpacity={1} onPress={(props.onPress || props.openImage) ? onPressImage : null} style={[{ width: '100%', height: '100%', }, props.renderLoader && (loading || error) ? { backgroundColor: Colors().App.Dark, justifyContent: 'center', alignItems: 'center' } : {}]}>
              {(props.renderLoader && loading) ? <ActivityIndicator /> : (props.renderLoader && error) ? <VectorIcons icon="AntDesign" name="exclamationcircle" size={RFValue(30)} color={Colors().App.Red} /> : props.children}
            </TouchableOpacity>
          </FastImage>

          :
          <View style={[ChangeDirectionStyle(props.style, props.noDirectionChange, props.showStyle)]}>
            <RNImage {...props} children={null} style={{ resizeMode: ConvertStyleToObject(props.style).resizeMode || 'cover', width: '100%', height: '100%' }} />
            <TouchableOpacity activeOpacity={1} onPress={(props.onPress || props.openImage) ? onPressImage : null} style={{ position: 'absolute', right: 0, left: 0, top: 0, bottom: 0 }} >
              {props.children}
            </TouchableOpacity>
          </View>}

    </>
  )

}


export { Image }
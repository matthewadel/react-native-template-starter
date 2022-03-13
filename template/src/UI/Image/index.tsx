import React, { useState } from 'react'
import { Image as RNImage, ImageProps } from 'react-native'
import FastImage from 'react-native-fast-image'
import { ChangeDirectionStyle, View, TouchableOpacity, ConvertStyleToObject } from 'UI'
import { Modal } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import { SvgUri } from 'react-native-svg';
import { ITouchableOpacity } from 'models';

interface imageProps extends ImageProps, ITouchableOpacity {
  style?: any;
  onLoad?: any
  onError?: any
  noDirectionChange?: boolean;
  showStyle?: boolean;
  openImage?: boolean;
  onLayout?: any
  source: any
}

const Image = (props: imageProps) => {

  const [showModal, setShowModal] = useState(false)

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

  return (
    <>
      {!!props.openImage && <Modal onRequestClose={() => setShowModal(false)} visible={showModal} transparent={true}>
        <ImageViewer index={0} enableSwipeDown={true} onSwipeDown={() => setShowModal(false)} imageUrls={[{ url: props.source?.uri }]} />
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
            style={[{ resizeMode: 'contain', }, ChangeDirectionStyle(props.style, props.noDirectionChange, props.showStyle)]}
            resizeMode={ConvertStyleToObject(props.style).resizeMode ? FastImage.resizeMode[props.style.resizeMode] : FastImage.resizeMode.cover}
            source={{ ...normalisedSource(), priority: FastImage.priority.normal, cache: FastImage.cacheControl.immutable }}
          >
            <TouchableOpacity activeOpacity={1} onPress={(props.onPress || props.openImage) ? onPressImage : null} style={{ width: '100%', height: '100%' }} >
              {props.children}
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
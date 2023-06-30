import React from 'react';
import { View, Button, Text, VectorIcons, Colors, closeModal, openModal, RFValue } from 'UI';
import RNImagePicker from 'react-native-image-crop-picker';
import I18n from 'react-native-i18n';
import { FONT_FAMILY } from 'UI/Fonts';

interface IImagePicker {
  type?: 'video' | 'photo';
  onSelect: (res: any) => void;
}

export const ImagePicker = (props: IImagePicker) => {

  // capture an image
  const takeImage = () => {
    closeModal();

    const options = {
      includeBase64: true,
      compressImageQuality: 0.5,
      width: 400,
      height: 400,
      cropping: false,
      forceJpg: props.type === 'video' ? false : true,
    };

    setTimeout(() => {

      RNImagePicker.openCamera(options)
        .then((response: any) => {
          props.onSelect({ ...response, filename: response.filename || response.path.split('/')[response.path.split('/').length - 1] });
        })
        .catch((err) => {
          console.log(err);
        });

    }, 500);

  };

  //choose from gallery
  const showImagePicker = () => {
    const options: any = {
      mediaType: props.type === 'video' ? 'video' : 'photo',
      includeBase64: props.type === 'video' ? false : true,
      forceJpg: props.type === 'video' ? false : true,
    };

    // {
    //   (Platform.OS == 'android') ?
    //     launchImageLibrary(options)
    //       .then((response: any) => {
    //         const _file = Array.isArray(response.assets) ? response.assets[0] : response.assets;
    //         console.log(_file)
    //         props.onSelect({
    //           ..._file,
    //           data: _file.base64,
    //           mime: _file.type,
    //           path: _file.uri,
    //         });
    //         closeModal();
    //       })
    //       .catch((err: any) => {
    //         console.log(err);
    //         closeModal();
    //       })
    //     :
    RNImagePicker.openPicker(options)
      .then((response: any) => {
        console.log(response)
        props.onSelect({ ...response, filename: response.filename || response.path.split('/')[response.path.split('/').length - 1] });
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        closeModal();
      })

    // }
  };

  return openModal({
    children: (
      <View
        style={{
          borderRadius: RFValue(15),
          paddingVertical: RFValue(30),
          width: '70%',
          backgroundColor: Colors().App.White,
        }}>
        <Button
          onPress={takeImage}
          style={{
            width: '80%',
            borderRadius: RFValue(14),
          }}>
          <VectorIcons
            icon="FontAwesome"
            name="camera"
            color={Colors().Text.White}
            size={RFValue(30)}
            style={{ marginRight: RFValue(20) }}
          />
          <Text
            style={{ color: Colors().Text.White, fontFamily: FONT_FAMILY("BOLD"), }}>
            {I18n.t('UI.capture')}
          </Text>
        </Button>

        <Button
          onPress={showImagePicker}
          style={{
            width: '80%',
            borderRadius: RFValue(14),
            marginTop: RFValue(20),
          }}>
          <VectorIcons
            icon="EvilIcons"
            name="image"
            color={Colors().Text.White}
            size={RFValue(40)}
            style={{ marginRight: RFValue(20) }}
          />
          <Text
            style={{ color: Colors().Text.White, fontFamily: FONT_FAMILY("BOLD"), }}>
            {I18n.t('UI.gallery')}
          </Text>
        </Button>
      </View>
    )
  })
}

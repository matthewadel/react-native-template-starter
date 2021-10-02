import React from 'react';
import { View, Button, Text, VectorIcons, Colors, closeModal, openModal, RFValue, WIDTH } from 'UI';
import RNImagePicker from 'react-native-image-crop-picker';
import I18n from 'react-native-i18n';
import { IImageRes } from 'models';

interface IImagePicker {
  type?: 'video' | 'photo';
  onSelect: (res: IImageRes) => void;
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
    };

    RNImagePicker.openCamera(options)
      .then((response: IImageRes) => {
        const _file = response;
        props.onSelect(_file);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //choose from gallery
  const showImagePicker = () => {
    const options: any = {
      mediaType: props.type === 'video' ? 'video' : 'photo',
      includeBase64: props.type === 'video' ? false : true,
    };

    RNImagePicker.openPicker(options)
      .then((response: IImageRes | IImageRes[]) => {
        const _file = Array.isArray(response) ? response[0] : response;
        props.onSelect(_file);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        closeModal();
      });
  };

  return openModal({
    children: (
      <View style={{ width: WIDTH() }}>
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
              style={{ color: Colors().Text.White, fontWeight: 'bold' }}>
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
              style={{ color: Colors().Text.White, fontWeight: 'bold' }}>
              {I18n.t('UI.gallery')}
            </Text>
          </Button>
        </View>
      </View>
    )
  })
}

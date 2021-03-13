import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {View, Modal, Button, Text, VectorIcons, Colors} from 'UI';
import RNImagePicker from 'react-native-image-crop-picker';
import LocalizationContext from 'lang/i18n';

interface IImageRes {
  path: string;
}

interface IImagePicker {
  type: 'video' | 'photo';
  onSelect: (res: IImageRes) => void;
}

export const ImagePicker = forwardRef((props: IImagePicker, ref) => {
  const modalRef = useRef<any>(null);

  const handleModal = () => modalRef.current.handleModal();

  const openModal = () => modalRef.current.openModal();

  const closeModal = () => modalRef.current.closeModal();

  useImperativeHandle(ref, () => ({
    handleModal,
    closeModal,
    openModal,
  }));

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

  const {t} = React.useContext(LocalizationContext);
  return (
    <Modal ref={modalRef}>
      <View
        style={{
          borderRadius: RFValue(15),
          paddingVertical: RFValue(30),
          width: '60%',
          alignItems: 'center',
          backgroundColor: Colors().App.Secondary,
        }}>
        <Button
          onPress={takeImage}
          style={{
            width: '80%',
            paddingVertical: RFValue(20),
            borderRadius: RFValue(14),
          }}>
          <VectorIcons
            icon="FontAwesome"
            name="camera"
            color={Colors().Button.Primary.Text}
            size={RFValue(30)}
            style={{marginRight: RFValue(20)}}
          />
          <Text
            style={{color: Colors().Button.Primary.Text, fontWeight: 'bold'}}>
            {t('UI.capture')}
          </Text>
        </Button>

        <Button
          onPress={showImagePicker}
          style={{
            width: '80%',
            paddingVertical: RFValue(20),
            borderRadius: RFValue(14),
            marginTop: RFValue(20),
          }}>
          <VectorIcons
            icon="EvilIcons"
            name="image"
            color={Colors().Button.Primary.Text}
            size={RFValue(40)}
            style={{marginRight: RFValue(20)}}
          />
          <Text
            style={{color: Colors().Button.Primary.Text, fontWeight: 'bold'}}>
            {t('UI.gallery')}
          </Text>
        </Button>
      </View>
    </Modal>
  );
});

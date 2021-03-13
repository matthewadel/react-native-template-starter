import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { ChangeDirectionStyle, ConvertStyleToObject, WIDTH } from 'UI'
import RNModal from 'react-native-modal';
import { KeyboardAvoidingView, Platform, ViewStyle, TouchableWithoutFeedback, Keyboard, } from 'react-native';

interface ModalProps {
  isVisible?: boolean
  noDirectionChange?: boolean
  noSwipeDirection?: boolean
  children: any
  noKeyboardBehavior?: boolean
  backdropColor?: string
  onPressModal?: () => void
  modalStyle?: ViewStyle | ViewStyle[]
  containerStyle?: ViewStyle | ViewStyle[]
}

const Modal = forwardRef((props: ModalProps, ref) => {
  const [showModal, setShowModal] = useState(!!props.isVisible);

  const handleModal = () => {
    setShowModal(val => !val);
  };

  const closeModal = () => setShowModal(false);

  const openModal = () => setShowModal(true);

  useImperativeHandle(ref, () => ({
    handleModal,
    closeModal,
    openModal,
  }));

  return (
    <RNModal
      isVisible={showModal}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      onSwipeComplete={handleModal}
      useNativeDriver
      {...props}
      style={[
        {
          borderWidth: 1,
          borderColor: 'transparent',
          alignSelf: 'center',
          margin: 0,
        },
        props.noDirectionChange
          ? ConvertStyleToObject(props.modalStyle)
          : ChangeDirectionStyle(props.modalStyle),
      ]}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      swipeDirection={props.noSwipeDirection ? undefined : 'down'}
      backdropColor={props.backdropColor}
      backdropOpacity={0.8}
    >

      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? undefined : 'padding'}
        enabled={!props.noKeyboardBehavior}
        contentContainerStyle={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            width: WIDTH(),
          },
          props.containerStyle,
        ]}
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            width: WIDTH(),
          },
          ConvertStyleToObject(props.containerStyle),
        ]}>
        {props.noSwipeDirection ? (
          props.children
        ) : (
            <TouchableWithoutFeedback
              style={{
                width: '100%',
              }}
              onPress={() => {
                Keyboard.dismiss();
                !!props.onPressModal && props.onPressModal();
              }}>
              {props.children}
            </TouchableWithoutFeedback>
          )}
      </KeyboardAvoidingView>
    </RNModal>
  );
});

export default Modal
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { ChangeDirectionStyle, ConvertStyleToObject } from 'UI';
import RNModal from 'react-native-modal';
import { KeyboardAvoidingView, Platform, ViewStyle, TouchableWithoutFeedback, Keyboard, useWindowDimensions, } from 'react-native';

interface ModalProps {
  isVisible?: boolean;
  noDirectionChange?: boolean;
  noSwipeDirection?: boolean;
  children?: any;
  noKeyboardBehavior?: boolean;
  backdropColor?: string;
  onPressModal?: () => void;
  modalStyle?: ViewStyle | ViewStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
  showStyle?: boolean
}

export const ModalRef = React.createRef<any>();

export const openModal = (_props: ModalProps) => {
  ModalRef.current.open(_props);
};

export const closeModal = () => {
  ModalRef.current.closeModal();
};

export const Modal = forwardRef((_, ref) => {

  const [props, setProps] = useState<ModalProps>({});
  const [showModal, setShowModal] = useState(!!props.isVisible);
  const { width: WIDTH } = useWindowDimensions()

  const handleModal = () => {
    setShowModal((val) => !val);
  };

  const closeModalFunc = () => {
    setShowModal(false);
  };

  const openModalFunc = () => {
    setShowModal(true);
  };

  useImperativeHandle(ref, () => ({
    handleModal,
    closeModal: closeModalFunc,
    openModal: openModalFunc,
    open: (_props: ModalProps) => {
      setProps(_props);
      setShowModal(true);
    },
  }));

  return (
    <RNModal
      isVisible={showModal}
      onBackdropPress={closeModalFunc}
      onBackButtonPress={closeModalFunc}
      onSwipeComplete={handleModal}
      useNativeDriver
      propagateSwipe={true}
      {...props}
      style={[
        {
          borderWidth: 1,
          borderColor: 'transparent',
          alignSelf: 'center',
          margin: 0,
        }, ChangeDirectionStyle(props.modalStyle, props.noDirectionChange, props.showStyle),
      ]}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      swipeDirection={props.noSwipeDirection ? undefined : 'down'}
      backdropColor={props.backdropColor}
      backdropOpacity={0.8}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? undefined : 'padding'}
        enabled={!props.noKeyboardBehavior}
        contentContainerStyle={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            width: WIDTH,
          },
          props.containerStyle,
        ]}
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            width: WIDTH,
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

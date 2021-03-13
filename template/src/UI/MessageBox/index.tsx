import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {Modal, View, Text, VectorIcons, TouchableOpacity, Button} from 'UI';
import {Colors} from 'UI/Colors';

export type Action = {
  title: string;
  type?: 'PRIMARY' | 'SECONDARY';
  onPress?: Function;
};

export const MessageBoxRef = React.createRef<{
  open: Function;
  close: Function;
}>();

export const OpenMessageBox = (options: IMessageBoxOptions) =>
  MessageBoxRef.current?.open(options);

export const CloseMessageBox = () => MessageBoxRef.current?.close();

export interface IMessageBoxOptions {
  title: string;
  message: string;
  onDismiss?: Function;
  actions: Action[];
}

export const MessageBox = forwardRef((_, ref) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [onDismiss, setOnDismiss] = useState<Function | null>(null);
  const [actions, setActions] = useState<Action[]>([]);
  const [visible, setVisible] = useState(false);

  const close = () => {
    setVisible(false);
    onDismiss && onDismiss();
  };

  const open = (options: IMessageBoxOptions) => {
    setTitle(options.title);
    setMessage(options.message);
    setOnDismiss(() => options.onDismiss);
    setActions(options.actions);
    setVisible(true);
  };

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={close}
      onBackdropPress={close}>
      <View
        style={{
          width: '80%',
          borderRadius: RFValue(10),
          overflow: 'hidden',
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            backgroundColor: Colors().MessageBox.Header,
            padding: RFValue(10),
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: RFValue(18),
              color: Colors().MessageBox.Title,
            }}>
            {title}
          </Text>
          <TouchableOpacity
            onPress={close}
            style={{
              width: RFValue(20),
              height: RFValue(20),
              borderRadius: RFValue(10),
              backgroundColor: Colors().MessageBox.CloseBackground,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <VectorIcons
              size={RFValue(14)}
              color={Colors().MessageBox.CloseIcon}
              icon="FontAwesome5"
              name="times"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            padding: RFValue(20),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors().MessageBox.Body,
          }}>
          <Text
            numberOfLines={0}
            style={{
              fontSize: RFValue(16),
              textAlign: 'center',
              color: Colors().MessageBox.Message,
            }}>
            {message}
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          {actions.map((a, i) => {
            return (
              <Button
                type={a.type}
                onPress={a.onPress}
                style={{
                  flex: 1,
                  padding: RFValue(15),
                  marginBottom: 0,
                  borderRadius: 0,
                  borderRightWidth: i < actions.length - 1 ? 1 : 0,
                  borderTopWidth: 1,
                  height: RFValue(20),
                }}
                textStyle={{fontSize: RFValue(14), fontWeight: 'bold'}}>
                {a.title}
              </Button>
            );
          })}
        </View>
      </View>
    </Modal>
  );
});

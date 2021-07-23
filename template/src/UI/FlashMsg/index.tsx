import React from 'react'
import { Text, TouchableOpacity, RFValue, Colors, VectorIcons } from 'UI'
import { hideMessage } from 'react-native-flash-message'
import { useSelector } from 'react-redux';
import { IRootState } from 'models';

// export interface IFlashMsg {
//   msg: {
//     message: {
//       onPress: Function
//       type: string
//       message: string
//     }
//   }
// }

const FlashMsg = (props: any) => {

  let msg = props.msg
  const storeData = useSelector((state: IRootState) => ({
     notch: state.App?.notch?.top || 0,
  }));

  const onPressMessage = () => {
    if (msg && msg.message && msg.message.onPress)
      props.msg.message.onPress()
    hideMessage()
  }


  let background = msg.message.type === 'warning' ? 'orange' :
    msg.message.type === 'danger' ? '#f00' :
      msg.message.type === 'success' ? '#25D366' : 'orange'

  let iconName = msg.message.type === 'warning' ? 'exclamationcircleo' :
    msg.message.type === 'danger' ? 'closecircleo' :
      msg.message.type === 'success' ? 'checkcircleo' : 'frowno'

  return (
    <TouchableOpacity style={{ backgroundColor: background, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: RFValue(10), paddingTop: storeData.notch }} onPress={onPressMessage}>
      <VectorIcons icon="AntDesign" name={iconName} size={RFValue(16)} color={Colors().Text.White} />

      <Text numberOfLines={0} style={{ color: Colors().Text.White, fontSize: RFValue(16), textAlign: 'left', paddingHorizontal: RFValue(8), marginVertical: RFValue(8) }}>{msg.message.message}</Text>
    </TouchableOpacity>
  )
}

export { FlashMsg }

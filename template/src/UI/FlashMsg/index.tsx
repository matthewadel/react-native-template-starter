import React from 'react'
import { Text, TouchableOpacity, RFValue, Colors, VectorIcons } from 'UI'
import { hideMessage } from 'react-native-flash-message'
import { SafeAreaView } from 'react-native-safe-area-context';

const FlashMsg = (props: any) => {

  let msg = props.msg

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
    <SafeAreaView edges={['top']} style={{ backgroundColor: background, width: '100%' }}>
      <TouchableOpacity style={{ paddingVertical: RFValue(6), backgroundColor: background, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: RFValue(10), }} onPress={onPressMessage}>
        <VectorIcons icon="AntDesign" name={iconName} size={RFValue(16)} color={Colors().Text.White} />

        <Text numberOfLines={0} style={{ color: Colors().Text.White, fontSize: RFValue(16), textAlign: 'left', paddingHorizontal: RFValue(8), marginVertical: RFValue(8) }}>{msg.message.message}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export { FlashMsg }

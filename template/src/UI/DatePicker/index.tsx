import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { View, Modal, TouchableOpacity, Colors, WIDTH } from 'UI'
import RNDatePicker from 'react-native-date-picker'
import LocalizationContext from 'lang/i18n'
import { RFValue } from 'react-native-responsive-fontsize'

interface DatePickerProps {
  onPress: (dateModalRef: Date) => void
  selectedDate?: string
  maximumDate?: Date
}

const DatePicker = forwardRef((props: DatePickerProps, ref) => {

  const [selectedDate, setSelectedDate] = useState(props?.selectedDate && new Date(props.selectedDate) || new Date())
  const dateModalRef = useRef<any>(null)
  const { t } = React.useContext(LocalizationContext);

  const openModal = () => {
    dateModalRef.current.openModal()
  }

  const closeModal = () => {
    dateModalRef.current.closeModal()
  }

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal
  }));

  return (
    <Modal
      ref={dateModalRef}
      containerStyle={{ justifyContent: 'flex-end', }}
      modalStyle={{ justifyContent: 'flex-end' }}
    >
      <View style={{ width: '100%' }}>

        <View style={{ zIndex: 100, width: '100%', paddingHorizontal: '3%', height: RFValue(35), borderBottomWidth: 1, backgroundColor: Colors().White, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

          <TouchableOpacity onPress={() => { dateModalRef.current.handleModal(); props.onPress(selectedDate) }} textStyle={{ color: Colors().Dark, fontSize: RFValue(16) }}>{t('UI.ok')}</TouchableOpacity>

          <TouchableOpacity onPress={() => dateModalRef.current.handleModal()} textStyle={{ color: Colors().Dark, fontSize: RFValue(16) }}>{t('UI.cancel')}</TouchableOpacity>

        </View>

        <RNDatePicker
          maximumDate={props.maximumDate}
          locale='en'
          date={selectedDate}
          onDateChange={dateOfbirth => setSelectedDate(dateOfbirth)}
          mode='date'
          style={{ backgroundColor: Colors().White, width: WIDTH(), margin: 0, padding: 0 }}
        />

      </View>
    </Modal>
  )
})

export default DatePicker
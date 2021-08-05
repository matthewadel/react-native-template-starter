import React, { useState } from 'react';
import { View, Colors, WIDTH, RFValue, openModal, closeModal, TouchableOpacity } from 'UI';
import RNDatePicker from 'react-native-date-picker';
import LocalizationContext from 'lang/i18n';

interface DatePickerProps {
  onPress: (dateModalRef: Date) => void;
  selectedDate?: string;
  maximumDate?: Date;
}

export const DatePicker = (props: DatePickerProps) => {
  openModal({
    // containerStyle: { justifyContent: 'flex-end' },
    modalStyle: { justifyContent: 'flex-end' },
    children: <DatePickerView {...props} />
  })
}

export const DatePickerView = (props: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState(
    (props?.selectedDate && new Date(props?.selectedDate)) || new Date(),
  );
  const { t } = React.useContext(LocalizationContext);

  return (

    <View style={{ width: '100%' }}>
      <View
        style={{
          zIndex: 100,
          width: WIDTH(),
          paddingHorizontal: '3%',
          height: RFValue(35),
          borderBottomWidth: 1,
          backgroundColor: Colors().App.White,
          borderColor: Colors().App.BorderColor,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity style={{ height: '100%', paddingHorizontal: RFValue(15) }}
          onPress={() => {
            closeModal()
            props.onPress(selectedDate);
          }}>
          {t('UI.ok')}
        </TouchableOpacity>

        <TouchableOpacity style={{ height: '100%', paddingHorizontal: RFValue(15) }} onPress={closeModal}>
          {t('UI.cancel')}
        </TouchableOpacity>
      </View>

      <RNDatePicker
        maximumDate={props?.maximumDate}
        locale="en"
        date={selectedDate}
        onDateChange={(dateOfbirth) => setSelectedDate(dateOfbirth)}
        mode="date"
        style={{
          backgroundColor: Colors().App.White,
          width: WIDTH(),
          margin: 0,
          padding: 0,
        }}
      />
    </View>

  );
}

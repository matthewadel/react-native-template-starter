import { useNavigation } from '@react-navigation/native';
import { IScreenHeader } from 'models';
import React from 'react';
import { Colors, RFValue, VectorIcons, View } from 'UI';

export const ScreenHeader = (props: IScreenHeader) => {
  const Navigation = useNavigation<any>()
  return <View style={{ width: '100%' }}>
    <VectorIcons icon="Ionicons" name="reorder-three" onPress={() => Navigation.openDrawer()} style={{ borderWidth: 1, borderColor: Colors().App.Primary, borderRadius: RFValue(8), width: RFValue(40), height: RFValue(40) }} />
  </View>;
};

import { useNavigation } from '@react-navigation/native';
import { IScreenHeader } from 'models';
import React from 'react';
import { Colors, PADDING_HORIZONTAL, RFValue, VectorIcons, View } from 'UI';

export const ScreenHeader = (props: IScreenHeader) => {
  const Navigation = useNavigation<any>()
  return <View style={{ paddingHorizontal: PADDING_HORIZONTAL, width: '100%', alignItems: 'flex-start' }}>
    <VectorIcons size={RFValue(30)} icon="Ionicons" name="reorder-three" onPress={() => Navigation.openDrawer()} style={{ borderWidth: 1, borderColor: Colors().App.Primary, borderRadius: RFValue(8), width: RFValue(40), height: RFValue(40) }} />
  </View>;
};

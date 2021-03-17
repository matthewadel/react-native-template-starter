import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity, } from 'UI';

interface IDrawerContent {
  openDrawer: () => void
  closeDrawer: () => void
  isDrawerOpen: boolean
}

const DrawerContent = (props: IDrawerContent) => {

  const Navigation = useNavigation()
  return (

    <SafeAreaView
      edges={['top']}
      style={[{ height: '100%', }]}>
      <ScrollView style={{}} contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'flex-start', }}>

        <TouchableOpacity onPress={() => { Navigation.navigate('Welcome'); props.closeDrawer() }}>Welcome</TouchableOpacity>

      </ScrollView>
    </SafeAreaView>

  );
}

export { DrawerContent };
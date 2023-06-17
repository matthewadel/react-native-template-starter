import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity, } from 'UI';

interface IDrawerContent {
  navigation: any
}

const DrawerContent = (props: IDrawerContent) => {

  console.log(props.navigation)

  return (

    <SafeAreaView
      edges={['top']}
      style={[{ height: '100%', width: '100%' }]}>
      <ScrollView style={{}} contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'flex-start', }}>

        <TouchableOpacity onPress={() => { props.navigation.navigate('Welcome'); props.navigation.closeDrawer() }}>Welcome</TouchableOpacity>

      </ScrollView>
    </SafeAreaView>

  );
}

export { DrawerContent };
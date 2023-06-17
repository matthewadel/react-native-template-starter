import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Welcome } from 'screens';
import { createDrawerNavigator, useDrawerProgress, useDrawerStatus } from '@react-navigation/drawer';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { Colors, RFValue } from 'UI';
import { DrawerContent } from './DrawerContent';
import I18n from 'react-native-i18n';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const RootStack = () => {

  let StackScreen: any = Stack.Screen
  const progress: any = useDrawerProgress();
  const isDrawerOpen = useDrawerStatus() == "open"
  const [borderRadius, setBorderRadius] = useState(0)

  const Style = (x: number) => useAnimatedStyle(() => {

    const translateX = interpolate(progress.value, [0, 1], [0, x], Extrapolate.CLAMP);
    return {
      transform: [{ translateY: translateX }],
    };
  }, []);

  useEffect(() => {

    if (isDrawerOpen) {
      setBorderRadius(RFValue(20))
    }
    else
      setTimeout(() => {
        setBorderRadius(0)
      }, 400);

  }, [isDrawerOpen])

  return (
    <Animated.View style={[{ flex: 1, overflow: 'hidden', }, { borderRadius, }, Style(RFValue(300))]}>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          headerShown: false
        }}
        initialRouteName="Welcome">
        <StackScreen name="Welcome" component={Welcome} />
      </Stack.Navigator>
    </Animated.View>
  );
}

// options={{ stackAnimation: 'none' }}

export default () => {
  const renderDrawerContent = (props: any) => <DrawerContent {...props} />
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        overlayColor: "transparent",
        drawerPosition: I18n.locale == 'ar' ? 'right' : 'left',
        swipeEnabled: false,
        drawerStyle: {
          width: RFValue(215),
          backgroundColor: Colors().App.White,
        },
        sceneContainerStyle: { backgroundColor: Colors().App.White, }
      }}
      backBehavior="none"
      initialRouteName="DrawerScreen"
      drawerContent={renderDrawerContent}>
      <Drawer.Screen name="DrawerScreen" component={RootStack} />
    </Drawer.Navigator>
  );
};
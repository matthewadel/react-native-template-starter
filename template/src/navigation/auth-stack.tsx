import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import * as Screens from '@/screens';
import { i18n } from '@/translation';

export const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      key={i18n.language}
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Screens.Login} />
      <Stack.Screen name="Register" component={Screens.Register} />
    </Stack.Navigator>
  );
};

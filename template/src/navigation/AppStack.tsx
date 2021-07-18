import React from 'react';
import {createStackNavigator,CardStyleInterpolators} from '@react-navigation/stack';
import {Welcome} from 'screens';

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator
       screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
      initialRouteName="Welcome" headerMode="none">
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
}

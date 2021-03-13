import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Welcome} from 'screens';

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome" headerMode="none">
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
}

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { DashBoard } from 'screens'

const Stack = createStackNavigator();

export default function RootStack() {

    return (
        <Stack.Navigator initialRouteName="Splash" headerMode="none">
            <Stack.Screen name="DashBoard" component={DashBoard} />
        </Stack.Navigator>)
}
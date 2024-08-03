import { StatusBar } from 'react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tabs from './tabs';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AuthStack } from './screensStack';
import { AppContextProvider } from './AppContextProvider';


type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};


const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={"white"} />

      <NavigationContainer >
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName={'Home'}
        >
          {/* Tabs */}
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="Login" component={AuthStack} />

          {/* Screens */}
          {/*  */}

        </Stack.Navigator>
      </NavigationContainer>

    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



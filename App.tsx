import { StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import RootNavigation from './app/navigation/rootNavigation';
import { COLORS } from './app/constants';
import { useFonts } from 'expo-font';
import { AppContextProvider } from './app/navigation/AppContextProvider';




const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary6,
    // secondary: 'yellow',
  },
};

export default function App() {

  const [loaded, error] = useFonts({
    'Poppins-Regular': require('./app/assets/fonts/Poppins-Regular.ttf'),
    'Inter-Regular': require('./app/assets/fonts/Inter-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <PaperProvider theme={theme} >
      <AppContextProvider>
        <RootNavigation />
      </AppContextProvider>
    </PaperProvider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});



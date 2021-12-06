import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AppContext, AppContextValue } from './Context/AppContext';
import ContextTestView from './Components/ContextTestView';
import Colors from './Style/Colors';
import BodyContainer from './Components/Helpers/BodyContainer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import SergioTrendyRegular from './assets/fonts/SergioTrendy/SergioTrendy-Regular.ttf'
import PlanningView from './Components/Views/PlanningView';

export default function App() {

  const [areFontsLoaded] = useFonts({
    'SergioTrendy-Regular': SergioTrendyRegular
  })
  const [appContext, setAppContext] = useState(AppContextValue)

  return (
    <AppContext.Provider value={{...appContext, update: setAppContext}}>
      <SafeAreaProvider>
        {(!areFontsLoaded) ?
          <Text>Loading...</Text>
          :
          <PlanningView />
        }
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </AppContext.Provider>
  );

}

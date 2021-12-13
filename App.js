import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import React, { useState } from 'react';
import { Text} from 'react-native';
import { AppContext, AppContextValue } from './Context/AppContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import SergioTrendyRegular from './assets/fonts/SergioTrendy/SergioTrendy-Regular.ttf'
import PlanningView from './Components/Views/PlanningView'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

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

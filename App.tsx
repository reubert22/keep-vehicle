import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { AsyncStorageKeys, storeData, getData } from './src/utils/AsyncStorage';
import { MainNavigation } from './src/screens/MainNavigation';
import { Welcome } from './src/screens/Welcome/Welcome';
import { Colors } from './src/utils/Colors';

const App = (): JSX.Element => {
  const [shouldShowWelcome, setShouldShowWelcome] = useState(true);

  const getDataAsync = async () => {
    const shouldHide = await getData(AsyncStorageKeys.WELCOME);
    setShouldShowWelcome(shouldHide ? shouldHide.key : true);
  };

  const hideSplashScreen = () => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 50);
  };

  const preventHideSplashScreen = async () => {
    await SplashScreen.preventAutoHideAsync();
  };

  useEffect(() => {
    getDataAsync();
  });

  useEffect(() => {
    if (!shouldShowWelcome) {
      hideSplashScreen();
    } else {
      preventHideSplashScreen();
      hideSplashScreen();
    }
  }, [shouldShowWelcome]);

  const handleDismissWelcome = () => {
    storeData(AsyncStorageKeys.WELCOME, { key: false });
    getDataAsync();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <NavigationContainer>
          <StatusBar style="auto" />
          {shouldShowWelcome ? <Welcome onPress={handleDismissWelcome} /> : <MainNavigation />}
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.primaryBlue,
  },
});

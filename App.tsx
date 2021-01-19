import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Welcome } from "./src/screens/Welcome/Welcome";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigation } from "./src/screens/MainNavigation";
import { AsyncStorageKeys, storeData, getData } from "./src/utils/AsyncStorage";

export default function App() {
  const [shouldShowWelcome, setShouldShowWelcome] = useState(true);

  const getDataAsync = async () => {
    const shouldShow = await getData(AsyncStorageKeys.WELCOME);
    setShouldShowWelcome(shouldShow ? shouldShow.show : true);
  };

  useEffect(() => {
    getDataAsync();
  }, [shouldShowWelcome]);

  const handleDismissWelcome = () => {
    storeData(AsyncStorageKeys.WELCOME, { show: false });
    getDataAsync();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <NavigationContainer>
          <StatusBar style="auto" />
          {shouldShowWelcome ? (
            <Welcome onPress={handleDismissWelcome} />
          ) : (
            <MainNavigation />
          )}
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

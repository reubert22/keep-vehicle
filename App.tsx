import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Welcome } from "./src/screens/Welcome/Welcome";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigation } from "./src/screens/MainNavigation";

export default function App() {
  // temp (Remove that and replace method)
  const [show, setShow] = useState(true);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <NavigationContainer>
          <StatusBar style="auto" />
          {show ? (
            <Welcome
              onPress={() => {
                setShow(!show);
              }}
            />
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

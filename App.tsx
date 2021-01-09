import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Welcome } from "./src/screens/Welcome/Welcome";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Welcome />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  safeAreaView: {
    flex: 1,
  },
});

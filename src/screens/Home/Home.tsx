import React from "react";
import { View, StyleSheet, Text, Dimensions, Button } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import { clearData } from "../../utils/AsyncStorage";

const { width, height } = Dimensions.get("window");

const Stack = createMaterialTopTabNavigator();

export const Home: React.FC = () => (
  <Stack.Navigator initialRouteName="One">
    <Stack.Screen name="One" component={One} />
    <Stack.Screen name="Two" component={Two} />
    <Stack.Screen name="Three" component={Three} />
  </Stack.Navigator>
);

export const One: React.FC = () => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Button title="Clean up" onPress={clearData} />
    <Text>One example Screen</Text>
  </View>
);

export const Two: React.FC = () => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Text>Two example Screen</Text>
  </View>
);

export const Three: React.FC = () => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Text>Three example Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    backgroundColor: "#131C21",
    alignItems: "center",
    justifyContent: "center",
    height,
    width,
  },
});

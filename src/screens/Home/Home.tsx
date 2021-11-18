import React, { FC } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { clearData } from "../../utils/AsyncStorage";
import { List } from "../List/List";
import { Colors } from "../../utils/Colors";

const Stack = createMaterialTopTabNavigator();

export const Home: FC = () => (
  <Stack.Navigator
    initialRouteName="List"
    tabBarOptions={{
      activeTintColor: Colors.tertiaryBlue,
      inactiveTintColor: Colors.secondaryWhite,
      indicatorStyle: styles.tabBarIndicatorStyle,
      labelStyle: styles.tabBarLabelStyle,
      style: styles.tabBarStyle,
    }}
  >
    <Stack.Screen name="List" component={List} />
    <Stack.Screen name="Two" component={Two} />
    <Stack.Screen name="Three" component={Three} />
  </Stack.Navigator>
);

export const Two: FC = () => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Button title="Clear async storage" onPress={clearData} />
    <Text>Two example Screen</Text>
  </View>
);

export const Three: FC = () => (
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
  tabBarIndicatorStyle: {
    backgroundColor: Colors.tertiaryBlue,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  tabBarStyle: {
    backgroundColor: Colors.secondaryBlue,
    height: 50,
  },
});

import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./Home/Home";

const { Navigator, Screen } = createStackNavigator();

export const MainNavigation: FC = () => (
  <Navigator mode="modal">
    <Screen
      name="Home"
      component={Home}
      options={{
        // maybe do that inside with headerMode none ?
        title: "Keep Vehicle",
        headerStyle: {
          elevation: 0,
          height: 60,
        },
      }}
    />
  </Navigator>
);

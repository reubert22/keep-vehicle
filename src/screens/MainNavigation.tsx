import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "./Home/Home";

const { Navigator, Screen } = createStackNavigator();

export const MainNavigation: FC = () => (
  <Navigator mode="modal" headerMode="none">
    <Screen name="Home" component={Home} />
  </Navigator>
);

import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "./Home/Home";
import { CreateVehicle } from "./CreateVehicle/CreateVehicle";
import { RouteNames } from "../utils/RouteNames";

const { Navigator, Screen } = createStackNavigator();

export const MainNavigation: FC = () => (
  <Navigator mode="modal" headerMode="none">
    <Screen name={RouteNames.HOME} component={Home} />
    <Screen name={RouteNames.CREATE_VEHICLE} component={CreateVehicle} />
  </Navigator>
);

import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from './Home/Home';
import { CreateVehicle } from './CreateVehicle/CreateVehicle';

const { Navigator, Screen } = createStackNavigator();

export const MainNavigation: FC = () => (
  <Navigator mode="modal" headerMode="none">
    <Screen name="Home" component={Home} />
    <Screen name="CreateVehicle" component={CreateVehicle} />
  </Navigator>
);

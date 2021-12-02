import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './views/login';

const MainStack = createStackNavigator();

const Routes = () => {
  const { Navigator, Screen } = MainStack;

  return (
    <Navigator>
      <Screen component={Login} name="Login" />
    </Navigator>
  );
};

export default Routes;

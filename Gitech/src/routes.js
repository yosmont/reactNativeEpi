import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '@views/login';
import UserView from '@views/UserView';
import CreateRepos from '@views/CreateRepos';

const MainStack = createStackNavigator();

const Routes = () => {
  const { Navigator, Screen } = MainStack;

  return (
      <Navigator>
          <Screen component={Login} name="Login" />
          <Screen component={UserView} name="UserView" />
          <Screen component={CreateRepos} name="CreateRepos" />
    </Navigator>
  );
};

export default Routes;

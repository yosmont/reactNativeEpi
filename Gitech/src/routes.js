import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from '@views/login';
import UserView from '@views/UserView';
import CreateRepos from '@views/CreateRepos';
import Repository from "@views/repository";
import SearchRepo from "@views/SearchRepo";

const Stack = createNativeStackNavigator();

const Routes = () => {
  const { Navigator, Screen } = Stack;

  return (
      <Navigator>
          <Screen
            component={Login}
            name="Login"
            options={{
              headerStyle: {
                backgroundColor: '#2b2b2b'
              },
              headerTintColor: '#fff'
            }}
          />
          <Screen
            component={UserView}
            name="UserView"
            options={{
              title: 'User',
              headerStyle: {
                backgroundColor: '#2b2b2b'
              },
              headerTintColor: '#fff'
            }}
          />
          <Screen
            component={CreateRepos}
            name="CreateRepos"
            options={{
              title: 'Create a repository',
              headerStyle: {
                backgroundColor: '#2b2b2b'
              },
              headerTintColor: '#fff'
            }}
          />
          <Screen
            component={Repository}
            name="Repository"
            options={{
              headerStyle: {
                backgroundColor: '#2b2b2b'
              },
              headerTintColor: '#fff'
            }}
          />
          <Screen
            component={SearchRepo}
            name="SearchRepo"
            options={{
              title: 'Search a repository',
              headerStyle: {
                backgroundColor: '#2b2b2b'
              },
              headerTintColor: '#fff'
            }}
          />
    </Navigator>
  );
};

export default Routes;


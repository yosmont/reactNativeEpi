import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from '@views/login';
import UserView from '@views/UserView';
import CreateRepos from '@views/CreateRepos';
import Repository from "@views/repository";
import SearchRepo from "@views/SearchRepo";
import RepositoryCode from "@views/repository/code";
import FileView from "@views/repository/code/file";
import Issues from "@views/repository/issues";
import Issue from "@views/repository/issues/issue";
import NewIssue from "@views/repository/issues/new";
import PullRequests from "@views/repository/pullRequests";
import Home from '@views/Home';
import MyIssues from '@views/MyIssues';
import ReposList from "@views/ReposList";
import UsersList from "@views/UsersList";

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
          <Screen
            component={RepositoryCode}
            name="RepositoryCode"
            options={{
              title: 'Code',
              headerStyle: {
                backgroundColor: '#2b2b2b'
              },
              headerTintColor: '#fff'
            }}
          />
        <Screen
          component={FileView}
          name="FileView"
          options={{
            title: 'File',
            headerStyle: {
              backgroundColor: '#2b2b2b'
            },
            headerTintColor: '#fff'
          }}
        />
        <Screen
          component={Issues}
          name="Issues"
          options={{
            title: 'Issues',
            headerStyle: {
              backgroundColor: '#2b2b2b'
            },
            headerTintColor: '#fff'
          }}
        />
        <Screen
          component={Issue}
          name="Issue"
          options={{
            title: 'Issue',
            headerStyle: {
              backgroundColor: '#2b2b2b'
            },
            headerTintColor: '#fff'
          }}
        />
        <Screen
          component={NewIssue}
          name="NewIssue"
          options={{
            title: 'Create an issue',
            headerStyle: {
              backgroundColor: '#2b2b2b'
            },
            headerTintColor: '#fff'
          }}
        />
        <Screen
          component={PullRequests}
          name="PullRequests"
          options={{
            title: 'Pull Requests',
            headerStyle: {
              backgroundColor: '#2b2b2b'
            },
            headerTintColor: '#fff'
          }}
        />
        <Screen
            component={Home}
            name="Home"
            options={{
                headerStyle: {
                    backgroundColor: '#2b2b2b'
                },
                headerTintColor: '#fff'
            }}
          />
          <Screen
              component={MyIssues}
              name="MyIssues"
              options={{
                  headerStyle: {
                      backgroundColor: '#2b2b2b'
                  },
                  headerTintColor: '#fff'
              }}
          />
          <Screen
              component={ReposList}
              name="ReposList"
              options={{
                  headerStyle: {
                      backgroundColor: '#2b2b2b'
                  },
                  headerTintColor: '#fff'
              }}
          />
          <Screen
              component={UsersList}
              name="UsersList"
              options={{
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


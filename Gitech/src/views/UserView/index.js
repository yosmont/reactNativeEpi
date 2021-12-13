import React, { useEffect } from 'react';
import {styles} from "@src/styles";
import {Wrapper, UserWrapper, Image, Text} from './styles';

import CreateReposButton from "@components/UserView/CreateReposButton";
import ReposListButton from "@components/UserView/ReposListButton";
import UsersListButton from "@components/UserView/UsersListButton";
import {ActivityIndicator, RefreshControl, ScrollView} from "react-native";
import FollowButton from "@components/UserView/FollowButton";
import FullWidthCustomButton from '../../components/FullWidthCustomButton';

function GetNbOfPage(linkStr) {

    if (linkStr == null) {
        return (0);
    }
    return parseInt(linkStr.slice(linkStr.lastIndexOf("&page=") + 6, -13));
}

const UserView = (props) => {
    const octokit = props.route.params.octokit;
    const username = props.route.params.username;
    const [refreshing, setRefreshing] = React.useState(true);
    const [user, onUserLoaded] = React.useState(props.route.params.user);
    const [starredCount, onStarredLoaded] = React.useState(undefined);
    const [watchedCount, onWatchedLoaded] = React.useState(undefined);
    const [avatar, onAvatarLoaded] = React.useState(undefined);

    useEffect(() => {
        if (username) {
          octokit.rest.users.getByUsername({ username: username }).then((value) => {
              onUserLoaded(value.data);
              onAvatarLoaded({ uri: value.data.avatar_url });
          });
          octokit.rest.activity.listReposWatchedByUser({ username: username, per_page: 1 }).then((value) => {
            onWatchedLoaded(GetNbOfPage(value.headers.link));
          });
          octokit.rest.activity.listReposStarredByUser({ username: username, per_page: 1 }).then((value) => {
            onStarredLoaded(GetNbOfPage(value.headers.link));
          });
        }
      }, [username, refreshing])

    useEffect(() => {
      if (!username) {
        onAvatarLoaded({ uri: user.avatar_url });
        octokit.rest.activity.listReposStarredByAuthenticatedUser({per_page: 1}).then((value) => {
          onStarredLoaded(GetNbOfPage(value.headers.link));
        });
        octokit.rest.activity.listWatchedReposForAuthenticatedUser({ per_page: 1 }).then((value) => {
          onWatchedLoaded(GetNbOfPage(value.headers.link));
        });
      }
      setRefreshing(false);
    }, [user, refreshing])

    return (
      <Wrapper>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
            />
          }
        >
          {
            user && (starredCount !== undefined) && (watchedCount !== undefined) && avatar ?
            <UserWrapper>
              <Image source={avatar} />
              <Text>{username ? username : user.login  !== 'Loading' ? 'Hello ' + user.login + '!' : ''}</Text>
              <ReposListButton navigation={props.navigation} reposNb={user.public_repos} reposType="" user={user} octokit={octokit} username={username} />
              <ReposListButton navigation={props.navigation} reposNb={starredCount} reposType="Star" octokit={octokit} username={username} />
              <ReposListButton navigation={props.navigation} reposNb={watchedCount} reposType="Watch" octokit={octokit} username={username} />
              <UsersListButton navigation={props.navigation} userNb={user.following} userType="Following" octokit={octokit} username={username} />
              <UsersListButton navigation={props.navigation} userNb={user.followers} userType="Followed by" octokit={octokit} username={username} />
              {!username ?
                  <CreateReposButton navigation={props.navigation} octokitAuth={props.route.params.octokitAuth} />
                  :
                  <FollowButton octokit={octokit} username={username} />
              }
            </UserWrapper>
            :
            <ActivityIndicator size='large' color='#457cb7' />
          }
        </ScrollView>
      </Wrapper>
    );
}

export default UserView;

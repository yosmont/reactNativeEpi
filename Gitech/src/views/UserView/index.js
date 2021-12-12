import React, { useEffect } from 'react';
import {Wrapper, UserWrapper, Image, Text} from './styles';

import CreateReposButton from "@components/UserView/CreateReposButton";
import ReposListButton from "@components/UserView/ReposListButton";
import UsersListButton from "@components/UserView/UsersListButton";
import {ActivityIndicator} from "react-native";
import SearchReposButton from "@components/UserView/SearchReposButton";
import FollowButton from "@components/UserView/FollowButton";

function GetNbOfPage(linkStr) {

    if (linkStr == null) {
        return (0);
    }
    return parseInt(linkStr.slice(linkStr.lastIndexOf("&page=") + 6, -13));
}

const UserView = (props) => {
    const octokit = props.route.params.octokit;
    const username = props.route.params.username;
    const [user, onUserLoaded] = React.useState(props.route.params.user);
    const [starredCount, onStarredLoaded] = React.useState(undefined);
    const [watchedCount, onWatchedLoaded] = React.useState(undefined);

    useEffect( () => {
        if (username) {
          octokit.rest.users.getByUsername({ username: username }).then((value) => {
            onUserLoaded(value.data);
          });
          octokit.rest.activity.listReposWatchedByUser({ username: username, per_page: 1 }).then((value) => {
            onWatchedLoaded(GetNbOfPage(value.headers.link));
          });
          octokit.rest.activity.listReposStarredByUser({ username: username, per_page: 1 }).then((value) => {
            onStarredLoaded(GetNbOfPage(value.headers.link));
          });
        }
      }, [])

    useEffect(() => {
      if (!username)
        octokit.rest.activity.listReposStarredByAuthenticatedUser({ per_page: 1 }).then((value) => {
          onStarredLoaded(GetNbOfPage(value.headers.link));
        });
    }, [user])

    useEffect(() => {
      if (!username)
        octokit.rest.activity.listWatchedReposForAuthenticatedUser({ per_page: 1 }).then((value) => {
          onWatchedLoaded(GetNbOfPage(value.headers.link));
        });
    }, [user])

    return (
      <Wrapper>
        {user && starredCount && watchedCount ?
          <UserWrapper>
            {user && <Image source={{ uri: user.avatar_url }} />}
            <Text>{username ? username : user.login  !== 'Loading' ? 'Hello ' + user.login + '!' : ''}</Text>
            <ReposListButton navigation={props.navigation} reposNb={user.public_repos} reposType="" user={user} octokit={octokit} />
            <ReposListButton navigation={props.navigation} reposNb={starredCount} reposType="Star" octokit={octokit} />
            <ReposListButton navigation={props.navigation} reposNb={watchedCount} reposType="Watch" octokit={octokit} />
            <UsersListButton navigation={props.navigation} userNb={user.following} userType="Following" />
            <UsersListButton navigation={props.navigation} userNb={user.followers} userType="Followed by" />
            {!username ?
                <CreateReposButton navigation={props.navigation} octokitAuth={props.route.params.octokitAuth} />
                :
                <FollowButton octokit={octokit} username={username} />
            }
            <SearchReposButton navigation={props.navigation} octokit={octokit} />
          </UserWrapper>
          :
          <ActivityIndicator size='large' color='#457cb7' />
        }
      </Wrapper>
    );
}

export default UserView;

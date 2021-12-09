import React, { useEffect } from 'react';
import { Wrapper, Image, Text } from './styles';

import CreateReposButton from "@components/UserView/CreateReposButton";
import ReposListButton from "@components/UserView/ReposListButton";
import UsersListButton from "@components/UserView/UsersListButton";
import SearchReposButton from "@components/UserView/SearchReposButton";

const { Octokit } = require("@octokit/rest");

function GetNbOfPage(linkStr) {

    if (linkStr == null) {
        return (0);
    }
    return parseInt(linkStr.slice(linkStr.lastIndexOf("&page=") + 6, -13));
}

const UserView = (props) => {

    const octokit = new Octokit({
        auth: props.route.params.octokitAuth
    });

    const username = props.username;
    const [user, onUserLoaded] = React.useState("Loading");
    const [starredCount, onStarredLoaded] = React.useState("Loading");
    const [watchedCount, onWatchedLoaded] = React.useState("Loading");

    useEffect( () => {
      console.log(username);
        if (!username) {
          octokit.rest.users.getAuthenticated().then((value) => {
            onUserLoaded(value.data);
          });
        } else {
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
      octokit.rest.activity.listReposStarredByAuthenticatedUser({ per_page: 1 }).then((value) => {
        onStarredLoaded(GetNbOfPage(value.headers.link));
      });
    }, [user])

    useEffect(() => {
      octokit.rest.activity.listWatchedReposForAuthenticatedUser({ per_page: 1 }).then((value) => {
        onWatchedLoaded(GetNbOfPage(value.headers.link));
      });
    }, [user])

    return (
        <Wrapper>
            <Image source={{ uri: user.avatar_url }} />
            <Text>{username ? username +  'profile' : user.login  !== 'Loading' ? 'Hello ' + user.login + '!' : ''}</Text>
            <ReposListButton navigation={props.navigation} reposNb={user.public_repos} reposType="" octokit={octokit} />
            <ReposListButton navigation={props.navigation} reposNb={starredCount} reposType="Star" octokit={octokit} />
            <ReposListButton navigation={props.navigation} reposNb={watchedCount} reposType="Watch" octokit={octokit} />
            <UsersListButton navigation={props.navigation} userNb={user.following} userType="Follow" />
            <UsersListButton navigation={props.navigation} userNb={user.followers} userType="Following by" />
            <CreateReposButton navigation={props.navigation} octokitAuth={props.route.params.octokitAuth} />
            <SearchReposButton navigation={props.navigation} octokit={octokit} />
        </Wrapper>
    );
}

export default UserView;

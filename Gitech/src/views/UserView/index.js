import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import CreateReposButton from "@components/UserView/CreateReposButton";
import ReposListButton from "@components/UserView/ReposListButton";
import UsersListButton from "@components/UserView/UsersListButton";

const { Octokit } = require("@octokit/rest");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10
    }
});

function GetNbOfPage(linkStr) {
    return parseInt(linkStr.slice(linkStr.lastIndexOf("&page=") + 6, -13))
}

const UserView = (props) => {
    const octokit = new Octokit({
        auth: props.route.params.octokitAuth
    });
    const username = props.route.params.username;
    const loginProfile = props.route.params.loginProfile;
    const [user, onUserLoaded] = React.useState("Loading");
    const [starredCount, onStarredLoaded] = React.useState("Loading");
    const [watchedCount, onWatchedLoaded] = React.useState("Loading");
    octokit.rest.users.getByUsername({ username: username }).then((value) => {
        onUserLoaded(value.data);
    });
    octokit.rest.activity.listReposStarredByUser({ username: username, per_page: 1 }).then((value) => {
        onStarredLoaded(GetNbOfPage(value.headers.link));
    });
    octokit.rest.activity.listReposWatchedByUser({ username: username, per_page: 1 }).then((value) => {
        onWatchedLoaded(GetNbOfPage(value.headers.link));
    });
    if (loginProfile == "true") {
        return (
            <View style={styles.container}>
                <Image source={{ uri: user.avatar_url }} style={{ width: 100, height: 100, borderRadius: 50, alignItems: 'center' }} />
                <Text>Hello {username}!</Text>
                <ReposListButton reposNb={user.public_repos} reposType="" />
                <ReposListButton reposNb={starredCount} reposType="Star" />
                <ReposListButton reposNb={watchedCount} reposType="Watch" />
                <UsersListButton userNb={user.following} userType="Follow" />
                <UsersListButton userNb={user.followers} userType="Following by" />
                <CreateReposButton navigation={props.navigation} octokitAuth={octokit.auth} />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Image source={{ uri: user.avatar_url }} style={{ width: 100, height: 100, borderRadius: 50, alignItems: 'center' }} />
                <Text>{username} profile</Text>
                <ReposListButton reposNb={user.public_repos} reposType="" />
                <ReposListButton reposNb={starredCount} reposType="Star" />
                <ReposListButton reposNb={starredCount} reposType="Follow" />
                <UsersListButton userNb={user.following} userType="Follow" />
                <UsersListButton userNb={user.followers} userType="Following by" />
            </View>
        );
    }
}

export default UserView;
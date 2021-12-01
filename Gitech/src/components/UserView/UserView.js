import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import CreateReposButton from "./CreateReposButton/CreateReposButton";
import ReposListButton from "./ReposListButton/ReposListButton";
import UsersListButton from "./UsersListButton/UsersListButton";

const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
    auth: "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"
})

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
    const [user, onUserLoaded] = React.useState("Loading");
    const [starredCount, onStarredLoaded] = React.useState("Loading");
    const [watchedCount, onWatchedLoaded] = React.useState("Loading");
    octokit.rest.users.getByUsername({ username: props.username }).then((value) => {
        onUserLoaded(value.data);
    });
    octokit.rest.activity.listReposStarredByUser({ username: props.username, per_page: 1 }).then((value) => {
        onStarredLoaded(GetNbOfPage(value.headers.link));
    });
    octokit.rest.activity.listReposWatchedByUser({ username: props.username, per_page: 1 }).then((value) => {
        onWatchedLoaded(GetNbOfPage(value.headers.link));
    });
    if (props.loginProfile == "true") {
        return (
            <View style={styles.container}>
                <Image source={{ uri: user.avatar_url }} style={{ width: 100, height: 100, borderRadius: 50, alignItems: 'center' }} />
                <Text>Hello {props.username}!</Text>
                <ReposListButton reposNb={user.public_repos} reposType="" />
                <ReposListButton reposNb={starredCount} reposType="Star" />
                <ReposListButton reposNb={watchedCount} reposType="Watch" />
                <UsersListButton userNb={user.following} userType="Follow" />
                <UsersListButton userNb={user.followers} userType="Following by" />
                <CreateReposButton />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Image source={{ uri: user.avatar_url }} style={{ width: 100, height: 100, borderRadius: 50, alignItems: 'center' }} />
                <Text>{props.username} profile</Text>
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
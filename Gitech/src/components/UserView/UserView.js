import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
const { Octokit } = require("@octokit/rest");

const octokit = new Octokit ({
    auth: "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",
    userAgent: 'Gitech v1',
    baseUrl: 'https://api.github.com/users/',
    log: {
        debug: () => {},
        info: () => {},
        warn: console.warn,
        error: console.error
    },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10
  },
  box: {
    flex: 0,
    backgroundColor: '#808080',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    borderRadius: 10,
    margin: 10,
    padding: 20
  }
});

const ReposListButton = (props) => {
    return (
        <TouchableOpacity onPress={() => alert('Repos List Button pressed')} style={styles.box}>
            <Text>{props.reposType} {props.reposNb} repositories</Text>
        </TouchableOpacity>
    );
}

const UsersListButton = (props) => {
    return (
        <TouchableOpacity onPress={() => alert('User List Button pressed')} style={styles.box}>
            <Text>{props.userType} {props.userNb} users</Text>
        </TouchableOpacity>
    );
}

const CreateReposButton = (props) => {
    return (
        <TouchableOpacity onPress={() => alert('Create Button pressed')} style={styles.box}>
            <Text>Create a new repos</Text>
        </TouchableOpacity>
    );
}

const UserView = (props) => {
    var user = octokit.rest.users.getByUsername(props.username)
    if (props.loginProfile == "true") {
        return (
            <View style={styles.container}>
                <Image source={{uri: user.avatar_url}} style={{width: 100, height: 100, borderRadius: 50, alignItems: 'center'}} />
                <Text>Hello {props.username}!</Text>
                <ReposListButton reposNb={user.public_repos} reposType="" />
                <ReposListButton reposNb={-1} reposType="Star" />
                <ReposListButton reposNb={-1} reposType="Follow" />
                <UsersListButton userNb={user.following} userType="Follow" />
                <UsersListButton userNb={user.followers} userType="Following by" />
                <CreateReposButton />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Image source={{uri: user.avatar_url}} style={{width: 100, height: 100, borderRadius: 50, alignItems: 'center'}} />
                <Text>Hello {props.username}!</Text>
                <ReposListButton reposNb={user.public_repos} reposType="" />
                <ReposListButton reposNb={-1} reposType="Star" />
                <ReposListButton reposNb={-1} reposType="Follow" />
                <UsersListButton userNb={user.following} userType="Follow" />
                <UsersListButton userNb={user.followers} userType="Following by" />
            </View>
        );
    }
}

export default UserView;
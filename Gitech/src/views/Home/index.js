import React, { useEffect } from 'react';
import {styles} from "@src/styles";
import {ActivityIndicator, RefreshControl, ScrollView} from "react-native";
import { Wrapper, UserWrapper, Image, Text, LargeText, Card } from './styles';

import LimitedWidthCustomButton from "@components/LimitedWidthCustomButton";
import FullWidthCustomButton from "@components/FullWidthCustomButton";
import SearchReposButton from "@components/UserView/SearchReposButton";

function GetNbOfPage(linkStr) {

    if (linkStr == null) {
        return (0);
    }
    return parseInt(linkStr.slice(linkStr.lastIndexOf("&page=") + 6, -13));
}

function GoToMyUserView(navigation, octokit) {
    octokit.rest.users.getAuthenticated().then((value) => {
        navigation.push('UserView', { navigation: navigation, octokit: octokit, user: value.data ? value.data : undefined });
    });
}

function GoToMyIssues(navigation, octokit) {
    navigation.push('MyIssues', { navigation: navigation, octokit: octokit });
}

function GoToReposList(navigation, octokit, type) {
    navigation.push('ReposList', { navigation: navigation, octokit: octokit, type: type });
}

function NotImplemented(navigation, octokit) {
    alert("not implemented");
}

function TestUserView(navigation, octokit, username) {
    navigation.push('UserView', { navigation: navigation, octokit: octokit, username: username });
}

function TestReposView(navigation, octokit) {
    octokit.rest.users.getAuthenticated().then((value) => {
        navigation.push('Repository', { navigation: navigation, octokit: octokit, user: value.data });
    });
}

const Home = (props) => {
    const octokit = props.route.params.octokit;
    const [refreshing, setRefreshing] = React.useState(false);
    const [reposBtnTxt, onReposBtnTxtLoad] = React.useState(undefined);
    const [issuesBtnTxt, onIssuesBtnTxtLoad] = React.useState(undefined);
    const [starredBtnTxt, onStarredBtnTxtLoad] = React.useState(undefined);
    const [watchedBtnTxt, onWatchedBtnTxtLoad] = React.useState(undefined);

    useEffect(() => {
        octokit.rest.repos.listForAuthenticatedUser({ per_page: 1 }).then((value) => {
            onReposBtnTxtLoad("My " + GetNbOfPage(value.headers.link) + " repository");
        });
        octokit.rest.issues.listForAuthenticatedUser({ per_page: 1 }).then((value) => {
            onIssuesBtnTxtLoad("My " + GetNbOfPage(value.headers.link) + " issues");
        });
        octokit.rest.activity.listReposStarredByAuthenticatedUser({ per_page: 1 }).then((value) => {
            onStarredBtnTxtLoad("My " + GetNbOfPage(value.headers.link) + " starred");
        });
        octokit.rest.activity.listWatchedReposForAuthenticatedUser({ per_page: 1 }).then((value) => {
            onWatchedBtnTxtLoad("My " + GetNbOfPage(value.headers.link) + " watched");
        });
        setRefreshing(false);
    }, [refreshing])

    return (
        <Wrapper>
            <UserWrapper>
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
                        reposBtnTxt && issuesBtnTxt && starredBtnTxt && watchedBtnTxt ?
                          <UserWrapper>
                              <FullWidthCustomButton onPress={() => GoToMyUserView(props.navigation, octokit)} Text="My profile" />
                              <FullWidthCustomButton onPress={() => GoToReposList(props.navigation, octokit, "MyRepos")} Text={reposBtnTxt} />
                              {/*<FullWidthCustomButton onPress={() => GoToMyIssues(props.navigation, octokit)} Text={issuesBtnTxt} />*/}
                              {/*<FullWidthCustomButton onPress={() => NotImplemented(props.navigation, octokit)} Text="My pull request" />*/}
                              <FullWidthCustomButton onPress={() => GoToReposList(props.navigation, octokit, "MyStar")} Text={starredBtnTxt} />
                              <FullWidthCustomButton onPress={() => GoToReposList(props.navigation, octokit, "MyWatch")} Text={watchedBtnTxt} />
                              <SearchReposButton navigation={props.navigation} octokit={octokit} />
                          </UserWrapper>
                          :
                          <ActivityIndicator size='large' color='#457cb7' />
                    }
                </ScrollView>
            </UserWrapper>
        </Wrapper>
    );
}

export default Home;

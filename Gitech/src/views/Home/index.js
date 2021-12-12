import React, { useEffect } from 'react';
import { ActivityIndicator } from "react-native";
import { Wrapper, UserWrapper, Image, Text, LargeText, Card } from './styles';

import LimitedWidthCustomButton from "@components/LimitedWidthCustomButton";

function GetNbOfPage(linkStr) {

    if (linkStr == null) {
        return (0);
    }
    return parseInt(linkStr.slice(linkStr.lastIndexOf("&page=") + 6, -13));
}

function GoToMyUserView(navigation, octokit) {
    octokit.rest.users.getAuthenticated().then((value) => {
        navigation.navigate('UserView', { navigation: navigation, octokit: octokit, user: value.data ? value.data : undefined });
    });
}

function NotImplemented(navigation, octokit) {
    alert("not implemented");
}

const Home = (props) => {
    const octokit = props.route.params.octokit;
    const [reposBtnTxt, onReposBtnTxtLoad] = React.useState("My repository");
    const [issuesBtnTxt, onIssuesBtnTxtLoad] = React.useState("My issues");
    const [starredBtnTxt, onStarredBtnTxtLoad] = React.useState("My starred");
    const [watchedBtnTxt, onWatchedBtnTxtLoad] = React.useState("My watched");
    useEffect(() => {
        octokit.rest.repos.listForAuthenticatedUser({ per_page: 1 }).then((value) => {
            onReposBtnTxtLoad("My " + GetNbOfPage(value.headers.link) + " repository");
        });
        octokit.rest.issues.list({ per_page: 1 }).then((value) => {
            onIssuesBtnTxtLoad("My " + GetNbOfPage(value.headers.link) + " issues");
        });
        octokit.rest.activity.listReposStarredByAuthenticatedUser({ per_page: 1 }).then((value) => {
            onStarredBtnTxtLoad("My " + GetNbOfPage(value.headers.link) + " starred");
        });
        octokit.rest.activity.listWatchedReposForAuthenticatedUser({ per_page: 1 }).then((value) => {
            onWatchedBtnTxtLoad("My " + GetNbOfPage(value.headers.link) + " watched");
        });
    })
    return (
        <Wrapper>
            <Card>
                <LimitedWidthCustomButton onPress={() => GoToMyUserView(props.navigation, octokit)} Text="My profile" width={300} />
                <LimitedWidthCustomButton onPress={() => NotImplemented(props.navigation, octokit)} Text={reposBtnTxt} width={300} />
                <LimitedWidthCustomButton onPress={() => NotImplemented(props.navigation, octokit)} Text={issuesBtnTxt} width={300} />
                {/*<LimitedWidthCustomButton onPress={() => NotImplemented(props.navigation, octokit)} Text="My pull request" width={300} />*/}
                <LimitedWidthCustomButton onPress={() => NotImplemented(props.navigation, octokit)} Text={starredBtnTxt} width={300} />
                <LimitedWidthCustomButton onPress={() => NotImplemented(props.navigation, octokit)} Text={watchedBtnTxt} width={300} />
            </Card>
        </Wrapper>
    );
}

export default Home;